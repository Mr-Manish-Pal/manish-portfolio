import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')

if (!root) throw new Error('Portfolio root element was not found')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
