import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Render the same application tree used by the browser entry for static HTML generation. */
export function renderApp(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
