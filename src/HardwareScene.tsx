import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

const boardColors = {
  pcb: 0x1e65a2,
  pcbSide: 0x123e68,
  trace: 0x72afd6,
  solderMask: 0x164c80,
  chip: 0x111418,
  chipEdge: 0x242a2e,
  header: 0x15191d,
  pin: 0xd3b981,
  metal: 0xb9c3c9,
  metalDark: 0x65727a,
  component: 0x22282d,
  cream: 0xf5ede7,
  burgundy: 0x32131f,
  led: 0x9e413a,
  glass: 0x182733,
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
    let active = false
    let visible = false
    let frame = 0
    let previousTime = 0
    let lastRenderTime = 0
    let pointerX = 0
    let pointerY = 0
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer | undefined
    let scene: THREE.Scene | undefined
    let camera: THREE.PerspectiveCamera | undefined
    let boardGroup: THREE.Group | undefined
    let resizeObserver: ResizeObserver | undefined
    let intersectionObserver: IntersectionObserver | undefined
    let disposeSceneResources: (() => void) | undefined

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobilePreference = window.matchMedia('(max-width: 700px)')

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduceMotion || mobilePreference.matches) return
      const bounds = canvasElement.getBoundingClientRect()
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2))
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2))
    }

    const onPointerLeave = () => {
      pointerX = 0
      pointerY = 0
    }

    const stop = () => {
      active = false
      window.cancelAnimationFrame(frame)
    }

    const render = (time: number) => {
      if (disposed || !renderer || !scene || !camera || !boardGroup) return
      if (mobilePreference.matches && time - lastRenderTime < 32) {
        frame = window.requestAnimationFrame(render)
        return
      }
      const delta = Math.min((time - (previousTime || time)) / 1000, 0.05)
      previousTime = time
      lastRenderTime = time

      if (!reduceMotion) {
        const ease = 1 - Math.exp(-delta * 4.5)
        const idle = Math.sin(time * 0.00042) * 0.012
        boardGroup.rotation.y += (0.16 + pointerX * 0.09 + idle - boardGroup.rotation.y) * ease
        boardGroup.rotation.x += (-0.28 + pointerY * 0.055 - boardGroup.rotation.x) * ease
        boardGroup.position.y += (Math.sin(time * 0.00055) * 0.018 - boardGroup.position.y) * ease
      }

      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    const start = () => {
      if (active || disposed || !visible || document.visibilityState === 'hidden') return
      active = true
      previousTime = 0
      if (reduceMotion && renderer && scene && camera) renderer.render(scene, camera)
      else frame = window.requestAnimationFrame(render)
    }

    const updateVisibility = () => {
      if (document.visibilityState === 'hidden') stop()
      else if (visible) start()
    }

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches
      onPointerLeave()
      stop()
      if (visible) start()
    }

    const onMobilePreferenceChange = () => {
      onPointerLeave()
      if (camera) {
        camera.position.set(
          mobilePreference.matches ? 4.1 : 4.9,
          mobilePreference.matches ? 5.9 : 5.7,
          mobilePreference.matches ? 7.6 : 7.6,
        )
        camera.zoom = mobilePreference.matches ? 1.42 : 1.5
        camera.updateProjectionMatrix()
      }
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      stop()
      onUnavailable()
    }

    async function initialize() {
      try {
        const THREE = await import('three')
        if (disposed) return

        const host = canvasElement.parentElement
        if (!host) return

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30)
        camera.zoom = mobilePreference.matches ? 1.42 : 1.5
        camera.position.set(
          mobilePreference.matches ? 4.1 : 4.9,
          mobilePreference.matches ? 5.9 : 5.7,
          7.6,
        )
        camera.lookAt(0, 0.05, 0)

        try {
          renderer = new THREE.WebGLRenderer({
            canvas: canvasElement,
            alpha: true,
            antialias: !mobilePreference.matches,
            powerPreference: 'low-power',
          })
        } catch {
          onUnavailable()
          return
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobilePreference.matches ? 1 : 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.1
        renderer.setClearColor(0x000000, 0)

        scene.add(new THREE.HemisphereLight(boardColors.cream, boardColors.burgundy, 2.15))
        const keyLight = new THREE.DirectionalLight(boardColors.cream, 2.7)
        keyLight.position.set(-3.5, 7, 5)
        scene.add(keyLight)
        const fillLight = new THREE.DirectionalLight(0xd7e3eb, 1.35)
        fillLight.position.set(4, 3, 3)
        scene.add(fillLight)
        const rimLight = new THREE.DirectionalLight(0xe6c9bb, 1.3)
        rimLight.position.set(-4, 4, -4)
        scene.add(rimLight)

        const pcbMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.pcb,
          roughness: 0.7,
          metalness: 0.12,
        })
        const pcbSideMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.pcbSide,
          roughness: 0.76,
          metalness: 0.1,
        })
        const chipMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.chip,
          roughness: 0.38,
          metalness: 0.22,
        })
        const chipEdgeMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.chipEdge,
          roughness: 0.48,
          metalness: 0.24,
        })
        const headerMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.header,
          roughness: 0.5,
          metalness: 0.15,
        })
        const pinMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.pin,
          roughness: 0.32,
          metalness: 0.78,
        })
        const metalMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.metal,
          roughness: 0.28,
          metalness: 0.84,
        })
        const darkMetalMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.metalDark,
          roughness: 0.35,
          metalness: 0.78,
        })
        const componentMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.component,
          roughness: 0.5,
          metalness: 0.16,
        })

        boardGroup = new THREE.Group()
        scene.add(boardGroup)
        let boardColorsTexture: THREE.CanvasTexture | undefined
        disposeSceneResources = () => {
          boardGroup?.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
              object.geometry.dispose()
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          })
          boardColorsTexture?.dispose()
        }

        const boardShape = new THREE.Shape()
        const halfWidth = 0.88
        const halfLength = 2.08
        const corner = 0.1
        boardShape.moveTo(-halfWidth + corner, -halfLength)
        boardShape.lineTo(halfWidth - corner, -halfLength)
        boardShape.quadraticCurveTo(halfWidth, -halfLength, halfWidth, -halfLength + corner)
        boardShape.lineTo(halfWidth, halfLength - corner)
        boardShape.quadraticCurveTo(halfWidth, halfLength, halfWidth - corner, halfLength)
        boardShape.lineTo(-halfWidth + corner, halfLength)
        boardShape.quadraticCurveTo(-halfWidth, halfLength, -halfWidth, halfLength - corner)
        boardShape.lineTo(-halfWidth, -halfLength + corner)
        boardShape.quadraticCurveTo(-halfWidth, -halfLength, -halfWidth + corner, -halfLength)

        const boardGeometry = new THREE.ExtrudeGeometry(boardShape, {
          depth: 0.075,
          bevelEnabled: true,
          bevelSegments: 2,
          bevelSize: 0.025,
          bevelThickness: 0.018,
          steps: 1,
        })
        boardGeometry.rotateX(-Math.PI / 2)
        const board = new THREE.Mesh(boardGeometry, [pcbSideMaterial, pcbMaterial])
        board.position.y = 0.055
        boardGroup.add(board)

        const addBox = (
          size: [number, number, number],
          position: [number, number, number],
          material: THREE.Material,
          parent = boardGroup!,
        ) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
          mesh.position.set(...position)
          parent.add(mesh)
          return mesh
        }

        const railLength = 3.76
        addBox([0.12, 0.095, railLength], [-0.735, 0.19, 0], headerMaterial)
        addBox([0.12, 0.095, railLength], [0.735, 0.19, 0], headerMaterial)

        const pinCount = mobilePreference.matches ? 16 : 20
        const pinGeometry = new THREE.CylinderGeometry(0.027, 0.027, 0.13, 6)
        const pins = new THREE.InstancedMesh(pinGeometry, pinMaterial, pinCount * 2)
        const pinMatrix = new THREE.Matrix4()
        let pinIndex = 0
        for (const x of [-0.735, 0.735]) {
          for (let index = 0; index < pinCount; index += 1) {
            const z = -1.78 + (index * 3.56) / (pinCount - 1)
            pinMatrix.makeTranslation(x, 0.235, z)
            pins.setMatrixAt(pinIndex, pinMatrix)
            pinIndex += 1
          }
        }
        pins.instanceMatrix.needsUpdate = true
        boardGroup.add(pins)

        addBox([0.67, 0.16, 0.67], [0, 0.25, 0.1], chipMaterial)
        addBox([0.55, 0.012, 0.53], [0, 0.336, 0.1], chipEdgeMaterial)

        const labelCanvas = document.createElement('canvas')
        labelCanvas.width = 512
        labelCanvas.height = 128
        const labelContext = labelCanvas.getContext('2d')
        if (labelContext) {
          labelContext.clearRect(0, 0, labelCanvas.width, labelCanvas.height)
          labelContext.fillStyle = '#D8DDE0'
          labelContext.font = '600 48px Arial, sans-serif'
          labelContext.textAlign = 'center'
          labelContext.textBaseline = 'middle'
          labelContext.fillText('STM32F103C8T6', 256, 64)
          boardColorsTexture = new THREE.CanvasTexture(labelCanvas)
          boardColorsTexture.colorSpace = THREE.SRGBColorSpace
          const label = new THREE.Mesh(
            new THREE.PlaneGeometry(0.48, 0.12),
            new THREE.MeshBasicMaterial({
              map: boardColorsTexture,
              transparent: true,
              depthWrite: false,
              toneMapped: false,
            }),
          )
          label.rotation.x = -Math.PI / 2
          label.position.set(0, 0.344, 0.1)
          boardGroup.add(label)
        }

        const leadGeometry = new THREE.BoxGeometry(0.085, 0.025, 0.018)
        const leadCountPerSide = 11
        const leads = new THREE.InstancedMesh(leadGeometry, metalMaterial, leadCountPerSide * 4)
        let leadIndex = 0
        for (let index = 0; index < leadCountPerSide; index += 1) {
          const offset = -0.27 + index * 0.054
          for (const side of [-1, 1]) {
            pinMatrix.makeTranslation(side * 0.36, 0.17, 0.1 + offset)
            leads.setMatrixAt(leadIndex, pinMatrix)
            leadIndex += 1
            pinMatrix.makeTranslation(offset, 0.17, 0.1 + side * 0.36)
            leads.setMatrixAt(leadIndex, pinMatrix)
            leadIndex += 1
          }
        }
        leads.instanceMatrix.needsUpdate = true
        boardGroup.add(leads)

        addBox([0.72, 0.29, 0.32], [0, 0.25, -1.94], metalMaterial)
        addBox([0.46, 0.135, 0.018], [0, 0.235, -2.105], boardColorsMeshMaterial(THREE, boardColors.glass))
        addBox([0.54, 0.035, 0.018], [0, 0.328, -2.105], darkMetalMaterial)

        addBox([0.3, 0.15, 0.2], [0, 0.18, -0.58], metalMaterial)
        addBox([0.42, 0.1, 0.18], [-0.4, 0.17, -0.48], componentMaterial)
        addBox([0.2, 0.09, 0.18], [0.44, 0.16, -0.53], componentMaterial)
        addBox([0.17, 0.09, 0.16], [-0.45, 0.16, 0.59], componentMaterial)
        addBox([0.18, 0.09, 0.16], [0.45, 0.16, 0.61], componentMaterial)
        addBox([0.19, 0.08, 0.16], [-0.48, 0.155, 1.06], metalMaterial)
        addBox([0.2, 0.1, 0.18], [0.45, 0.16, 1.02], componentMaterial)

        addBox([0.26, 0.1, 0.25], [0.47, 0.18, -1.19], metalMaterial)
        addBox([0.16, 0.08, 0.15], [0.47, 0.27, -1.19], componentMaterial)

        const ledMaterial = new THREE.MeshStandardMaterial({
          color: boardColors.led,
          roughness: 0.4,
          metalness: 0.08,
        })
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), ledMaterial)
        led.position.set(0.12, 0.205, -1.16)
        boardGroup.add(led)

        const traceMaterial = new THREE.LineBasicMaterial({
          color: boardColors.trace,
          transparent: true,
          opacity: 0.62,
        })
        const tracePaths: Array<Array<[number, number]>> = [
          [[-0.58, -1.45], [-0.42, -1.28], [-0.42, -0.86], [-0.34, -0.72]],
          [[0.58, -1.45], [0.38, -1.28], [0.38, -0.82], [0.34, -0.7]],
          [[-0.57, 1.48], [-0.35, 1.28], [-0.35, 0.78], [-0.33, 0.63]],
          [[0.57, 1.48], [0.36, 1.27], [0.36, 0.77], [0.34, 0.62]],
          [[-0.3, -0.5], [-0.55, -0.35], [-0.55, 0.15]],
          [[0.3, 0.5], [0.57, 0.38], [0.57, 0.05]],
        ]
        tracePaths.forEach((path) => {
          const points = path.map(([x, z]) => new THREE.Vector3(x, 0.132, z))
          boardGroup!.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), traceMaterial))
        })

        const mountRingGeometry = new THREE.TorusGeometry(0.07, 0.012, 4, 12)
        const mountRings = new THREE.InstancedMesh(mountRingGeometry, pinMaterial, 4)
        const mountCenters: Array<[number, number, number]> = [
          [-0.68, 0.14, -1.85],
          [0.68, 0.14, -1.85],
          [-0.68, 0.14, 1.85],
          [0.68, 0.14, 1.85],
        ]
        mountCenters.forEach(([x, y, z], index) => {
          pinMatrix.makeRotationX(-Math.PI / 2)
          pinMatrix.setPosition(x, y, z)
          mountRings.setMatrixAt(index, pinMatrix)
        })
        mountRings.instanceMatrix.needsUpdate = true
        boardGroup.add(mountRings)

        const resize = () => {
          if (!renderer || !camera || !host) return
          const width = Math.max(1, host.clientWidth)
          const height = Math.max(1, host.clientHeight)
          renderer.setSize(width, height, false)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobilePreference.matches ? 1 : 1.5))
          camera.aspect = width / height
          camera.position.set(
            mobilePreference.matches ? 4.1 : 4.9,
            mobilePreference.matches ? 5.9 : 5.7,
            7.6,
          )
          camera.zoom = mobilePreference.matches ? 1.42 : 1.5
          camera.lookAt(0, 0.05, 0)
          camera.updateProjectionMatrix()
          if (reduceMotion) renderer.render(scene!, camera)
        }

        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)
        resize()

        intersectionObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible) start()
          else stop()
        }, { threshold: 0 })
        intersectionObserver.observe(host)

        canvasElement.addEventListener('pointermove', onPointerMove, { passive: true })
        canvasElement.addEventListener('pointerleave', onPointerLeave, { passive: true })
        canvasElement.addEventListener('webglcontextlost', onContextLost)
        document.addEventListener('visibilitychange', updateVisibility)
        motionPreference.addEventListener('change', onMotionPreferenceChange)
        mobilePreference.addEventListener('change', onMobilePreferenceChange)

        renderer.render(scene, camera)
        onReady()

        const bounds = host.getBoundingClientRect()
        visible = bounds.bottom > 0 && bounds.top < window.innerHeight
        if (visible) start()
      } catch (error) {
        if (!disposed) {
          console.error('Unable to initialize the STM32 board visualization.', error)
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
      canvasElement.removeEventListener('pointerleave', onPointerLeave)
      canvasElement.removeEventListener('webglcontextlost', onContextLost)
      document.removeEventListener('visibilitychange', updateVisibility)
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
      mobilePreference.removeEventListener('change', onMobilePreferenceChange)
      disposeSceneResources?.()
      renderer?.dispose()
    }
  }, [onReady, onUnavailable])

  return <canvas className="hardware-scene-canvas" ref={canvasRef} aria-hidden="true" />
}

function boardColorsMeshMaterial(THREE: typeof import('three'), color: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.18 })
}
