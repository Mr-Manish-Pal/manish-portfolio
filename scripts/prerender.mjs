import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import { build, loadEnv } from 'vite'

const projectRoot = process.cwd()
const distDirectory = resolve(projectRoot, 'dist')
const buildEnv = loadEnv('production', projectRoot, '')
const serverBundleDirectory = await mkdtemp(
  join(projectRoot, 'node_modules', '.portfolio-ssr-'),
)

function resolveSiteUrl() {
  const configuredUrl =
    process.env.VITE_SITE_URL ||
    buildEnv.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  const fallbackUrl = 'https://mr-manish-pal.github.io/portfolio'
  const rawUrl = configuredUrl
    ? configuredUrl.startsWith('http')
      ? configuredUrl
      : `https://${configuredUrl}`
    : fallbackUrl

  let url
  try {
    url = new URL(rawUrl)
  } catch {
    throw new Error(`Invalid portfolio URL: ${rawUrl}`)
  }

  if (url.protocol !== 'https:' && url.hostname !== 'localhost') {
    throw new Error('The production portfolio URL must use HTTPS.')
  }

  return url.toString().replace(/\/+$/, '')
}

try {
  await build({
    configFile: false,
    root: projectRoot,
    plugins: [react()],
    logLevel: 'warn',
    build: {
      ssr: resolve(projectRoot, 'src/entry-server.tsx'),
      outDir: serverBundleDirectory,
      emptyOutDir: true,
      rollupOptions: { output: { format: 'es' } },
    },
  })

  const serverEntry = pathToFileURL(resolve(serverBundleDirectory, 'entry-server.js'))
  serverEntry.searchParams.set('build', String(Date.now()))
  const { render } = await import(serverEntry.href)
  const indexPath = resolve(distDirectory, 'index.html')
  let html = await readFile(indexPath, 'utf8')
  const serverRenderedApp = render()

  if (!html.includes('<!--app-html-->')) {
    throw new Error('Could not find the app HTML insertion point in dist/index.html.')
  }

  if (!serverRenderedApp.includes('Manish')) {
    throw new Error('The server-rendered portfolio content is unexpectedly empty.')
  }

  const siteUrl = resolveSiteUrl()
  html = html
    .replace('<!--app-html-->', serverRenderedApp)
    .replaceAll('__SITE_URL__', siteUrl)
  await writeFile(indexPath, html)

  await writeFile(
    resolve(distDirectory, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
  )
  await writeFile(
    resolve(distDirectory, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  )

  console.log(`Pre-rendered portfolio HTML and SEO metadata for ${siteUrl}/`)
} finally {
  await rm(serverBundleDirectory, { recursive: true, force: true })
}
