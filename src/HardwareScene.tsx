import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

const hardwareColors = {
  warmIvory: 0xf4efe7,
  mahogany: 0x38201f,
  bronze: 0xb58a68,
  pcbGreen: 0x375448,
  pcbTrace: 0xc38b68,
  darkPackage: 0x111a1e,
  darkScreen: 0x283a3b,
  screenInk: 0x142522,
  silver: 0xbcc2bf,
  studioWhite: 0xffffff,
  clear: 0x000000,
} as const

type HardwareSceneProps = {
  onReady: () => void
  onUnavailable: () => void
}

export default function HardwareScene({ onReady, onUnavailable }: HardwareSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasElement = canvas

    let disposed = false
    let frame = 0
    let renderer: THREE.WebGLRenderer | undefined
    let resizeObserver: ResizeObserver | undefined
    let intersectionObserver: IntersectionObserver | undefined
    let scene: THREE.Scene | undefined
    let camera: THREE.PerspectiveCamera | undefined
    let assembly: THREE.Group | undefined
    let disposeSceneResources: (() => void) | undefined
    let active = false
    let visible = false
    let pointerX = 0
    let pointerY = 0
    let scrollTarget = 0
    let scrollRotation = 0
    let previousTime = 0
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 700px)')

    const updateScrollTarget = () => {
      const bounds = canvasElement.getBoundingClientRect()
      const travel = Math.max(1, window.innerHeight + bounds.height)
      scrollTarget = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / travel))
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduceMotion || mobileQuery.matches) return
      const bounds = canvasElement.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      pointerX = Math.min(1, Math.max(-1, pointerX))
      pointerY = Math.min(1, Math.max(-1, pointerY))
    }

    const render = (time: number) => {
      if (disposed || !renderer || !scene || !camera || !assembly) return
      const delta = Math.min((time - (previousTime || time)) / 1000, 0.05)
      previousTime = time

      if (!reduceMotion) {
        const ease = 1 - Math.exp(-delta * 5)
        assembly.rotation.y += (pointerX * 0.12 + (scrollTarget - 0.5) * 0.12 - assembly.rotation.y) * ease
        assembly.rotation.x += (-pointerY * 0.07 + 0.025 - assembly.rotation.x) * ease
        scrollRotation += (scrollTarget * 0.035 - scrollRotation) * ease
        assembly.rotation.z = scrollRotation
      }

      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    const start = () => {
      if (active || disposed || !visible || document.visibilityState === 'hidden') return
      active = true
      previousTime = 0
      if (reduceMotion && scene && camera) renderer?.render(scene, camera)
      else frame = window.requestAnimationFrame(render)
    }

    const stop = () => {
      active = false
      window.cancelAnimationFrame(frame)
    }

    const setMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches
      pointerX = 0
      pointerY = 0
      stop()
      if (visible) start()
    }

    const setPageVisibility = () => {
      if (document.visibilityState === 'hidden') stop()
      else if (visible) start()
    }

    const setMobilePreference = () => {
      if (mobileQuery.matches) {
        pointerX = 0
        pointerY = 0
      }
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      stop()
      onUnavailable()
    }

    async function initialize() {
      try {
        const THREE = await import('three')
        if (disposed) return

        const simplifiedGeometry = mobileQuery.matches
        const host = canvasElement.parentElement
        if (!host) return

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(31, 1, 0.1, 40)
        camera.position.set(0, 3.1, 8.7)
        camera.lookAt(0, 0.12, 0)

        try {
          renderer = new THREE.WebGLRenderer({
            canvas: canvasElement,
            alpha: true,
            antialias: !mobileQuery.matches,
            powerPreference: 'low-power',
          })
        } catch {
          onUnavailable()
          return
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileQuery.matches ? 1 : 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.08
        renderer.setClearColor(hardwareColors.clear, 0)

        scene.add(new THREE.HemisphereLight(hardwareColors.warmIvory, hardwareColors.mahogany, 2.1))
        const keyLight = new THREE.DirectionalLight(hardwareColors.studioWhite, 2.7)
        keyLight.position.set(-3.5, 7, 5)
        scene.add(keyLight)
        const fillLight = new THREE.DirectionalLight(hardwareColors.warmIvory, 1.1)
        fillLight.position.set(4, 3, -3)
        scene.add(fillLight)

        const boardMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.pcbGreen,
          roughness: 0.77,
          metalness: 0.12,
        })
        const boardEdgeMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.bronze,
          roughness: 0.44,
          metalness: 0.65,
        })
        const darkMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.mahogany,
          roughness: 0.38,
          metalness: 0.2,
        })
        const chipMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.darkPackage,
          roughness: 0.32,
          metalness: 0.3,
        })
        const silverMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.silver,
          roughness: 0.27,
          metalness: 0.8,
        })
        const screenMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.darkScreen,
          roughness: 0.28,
          metalness: 0.18,
          emissive: hardwareColors.screenInk,
          emissiveIntensity: 0.18,
        })

        assembly = new THREE.Group()
        scene.add(assembly)
        disposeSceneResources = () => {
          assembly?.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
              object.geometry.dispose()
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          })
        }

        const makeBoard = (width: number, depth: number, x: number, z: number, rotation: number) => {
          const group = new THREE.Group()
          group.position.set(x, 0, z)
          group.rotation.y = rotation
          assembly!.add(group)

          const board = new THREE.Mesh(new THREE.BoxGeometry(width, 0.11, depth), boardMaterial)
          board.position.y = 0.06
          group.add(board)

          const edge = new THREE.Mesh(
            new THREE.BoxGeometry(width * 0.94, 0.025, depth * 0.9),
            boardEdgeMaterial,
          )
          edge.position.y = -0.006
          group.add(edge)

          const chip = new THREE.Mesh(
            new THREE.BoxGeometry(width * 0.29, 0.13, depth * 0.37),
            chipMaterial,
          )
          chip.position.set(-width * 0.12, 0.17, 0)
          group.add(chip)

          const chipTop = new THREE.Mesh(
            new THREE.BoxGeometry(width * 0.21, 0.012, depth * 0.25),
            darkMaterial,
          )
          chipTop.position.set(-width * 0.12, 0.241, 0)
          group.add(chipTop)

          const componentPositions: Array<[number, number, number, number]> = [
            [-width * 0.36, -depth * 0.27, width * 0.11, depth * 0.12],
            [width * 0.33, -depth * 0.26, width * 0.13, depth * 0.1],
            [width * 0.35, depth * 0.2, width * 0.12, depth * 0.13],
            [-width * 0.39, depth * 0.25, width * 0.1, depth * 0.11],
          ]
          componentPositions.slice(0, simplifiedGeometry ? 2 : componentPositions.length).forEach(([cx, cz, cw, cd], index) => {
            const component = new THREE.Mesh(
              new THREE.BoxGeometry(cw, index === 1 ? 0.14 : 0.08, cd),
              index === 1 ? silverMaterial : darkMaterial,
            )
            component.position.set(cx, 0.15, cz)
            group.add(component)
          })

          const pinGeometry = new THREE.BoxGeometry(0.055, 0.16, 0.055)
          const pinCount = Math.round(depth / (simplifiedGeometry ? 0.28 : 0.19))
          for (const side of [-1, 1]) {
            for (let index = 0; index < pinCount; index += 1) {
              const pin = new THREE.Mesh(pinGeometry, boardEdgeMaterial)
              pin.position.set(
                side * (width * 0.43),
                -0.035,
                (index / (pinCount - 1) - 0.5) * depth * 0.78,
              )
              group.add(pin)
            }
          }

          const tracePaths: Array<Array<[number, number]>> = [
            [[-0.4, -0.28], [-0.26, -0.28], [-0.18, -0.17], [0.05, -0.17]],
            [[0.06, 0.16], [0.2, 0.16], [0.29, 0.25], [0.42, 0.25]],
            [[-0.34, 0.23], [-0.22, 0.23], [-0.13, 0.1]],
          ]
          const traceMaterial = new THREE.LineBasicMaterial({ color: hardwareColors.pcbTrace })
          tracePaths.forEach((path) => {
            const points = path.map(
              ([px, pz]) => new THREE.Vector3(px * width, 0.119, pz * depth),
            )
            group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), traceMaterial))
          })

          const viaMaterial = new THREE.MeshStandardMaterial({
            color: hardwareColors.bronze,
            roughness: 0.4,
            metalness: 0.75,
          })
          ;[[-0.34, -0.28], [0.42, 0.25], [-0.34, 0.23]].forEach(([vx, vz]) => {
            const via = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.014, 8), viaMaterial)
            via.rotation.x = Math.PI / 2
            via.position.set(vx * width, 0.128, vz * depth)
            group.add(via)
          })
          return group
        }

        const platform = new THREE.Mesh(
          new THREE.BoxGeometry(5.25, 0.18, 3.35),
          new THREE.MeshStandardMaterial({ color: hardwareColors.warmIvory, roughness: 0.83, metalness: 0.04 }),
        )
        platform.position.y = -0.28
        assembly.add(platform)

        makeBoard(2.42, 1.52, -1.12, -0.05, -0.2)
        makeBoard(2.24, 1.45, 1.12, -0.05, 0.2)

        const displayFrame = new THREE.Mesh(
          new THREE.BoxGeometry(1.06, 0.14, 0.72),
          darkMaterial,
        )
        displayFrame.position.set(0, 0.16, 0.8)
        assembly.add(displayFrame)
        const display = new THREE.Mesh(
          new THREE.BoxGeometry(0.89, 0.018, 0.52),
          screenMaterial,
        )
        display.position.set(0, 0.24, 0.8)
        assembly.add(display)

        const waveformPoints = [
          [-0.36, 0.3, 0.88], [-0.25, 0.3, 0.88], [-0.19, 0.3, 0.79],
          [-0.13, 0.3, 0.94], [-0.06, 0.3, 0.69], [0.01, 0.3, 0.89],
          [0.09, 0.3, 0.79], [0.17, 0.3, 0.89], [0.25, 0.3, 0.82],
          [0.36, 0.3, 0.82],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z))
        const waveform = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(waveformPoints),
          new THREE.LineBasicMaterial({ color: hardwareColors.bronze }),
        )
        assembly.add(waveform)

        const connector = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.23, 0.34),
          silverMaterial,
        )
        connector.position.set(-1.92, 0.17, -0.05)
        assembly.add(connector)

        const sensor = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.13, 20),
          silverMaterial,
        )
        sensor.rotation.x = Math.PI / 2
        sensor.position.set(1.93, 0.22, 0.15)
        assembly.add(sensor)

        const screwMaterial = new THREE.MeshStandardMaterial({
          color: hardwareColors.silver,
          roughness: 0.3,
          metalness: 0.75,
        })
        for (const [sx, sz] of [[-2.42, -1.42], [2.42, -1.42], [-2.42, 1.42], [2.42, 1.42]]) {
          const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.018, 12), screwMaterial)
          screw.position.set(sx, -0.18, sz)
          assembly.add(screw)
        }

        const resize = () => {
          if (!renderer || !camera || !host) return
          const width = Math.max(1, host.clientWidth)
          const height = Math.max(1, host.clientHeight)
          renderer.setSize(width, height, false)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileQuery.matches ? 1 : 1.5))
          camera.aspect = width / height
          camera.position.z = mobileQuery.matches ? 10.1 : 8.7
          camera.updateProjectionMatrix()
          if (reduceMotion && scene && camera) renderer.render(scene, camera)
        }

        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)
        resize()

        intersectionObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible) {
            updateScrollTarget()
            start()
          } else {
            stop()
          }
        }, { threshold: 0 })
        intersectionObserver.observe(host)

        canvasElement.addEventListener('pointermove', onPointerMove, { passive: true })
        canvasElement.addEventListener('webglcontextlost', handleContextLost)
        window.addEventListener('scroll', updateScrollTarget, { passive: true })
        document.addEventListener('visibilitychange', setPageVisibility)
        mediaQuery.addEventListener('change', setMotionPreference)
        mobileQuery.addEventListener('change', setMobilePreference)
        onReady()
      } catch (error) {
        if (!disposed) {
          console.error('Unable to initialize the 3D workbench.', error)
          onUnavailable()
        }
      }
    }

    void initialize()

    return () => {
      disposed = true
      stop()
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      canvasElement.removeEventListener('pointermove', onPointerMove)
      canvasElement.removeEventListener('webglcontextlost', handleContextLost)
      window.removeEventListener('scroll', updateScrollTarget)
      document.removeEventListener('visibilitychange', setPageVisibility)
      mediaQuery.removeEventListener('change', setMotionPreference)
      mobileQuery.removeEventListener('change', setMobilePreference)
      disposeSceneResources?.()
      renderer?.dispose()
    }
  }, [onReady, onUnavailable])

  return <canvas className="hardware-scene-canvas" ref={canvasRef} aria-hidden="true" />
}
