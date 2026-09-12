import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const indexPath = resolve('dist/index.html')
const rootPlaceholder = '<div id="root"></div>'
const server = await createServer({
  appType: 'custom',
  server: { hmr: false, middlewareMode: true, ws: false },
})

try {
  const template = await readFile(indexPath, 'utf8')
  const { renderApp } = await server.ssrLoadModule('/src/entry-server.tsx')
  const appHtml = renderApp()

  if (!template.includes(rootPlaceholder)) {
    throw new Error(`Could not find ${rootPlaceholder} in ${indexPath}`)
  }

  await writeFile(indexPath, template.replace(rootPlaceholder, () => `<div id="root">${appHtml}</div>`))
} finally {
  await server.close()
}
