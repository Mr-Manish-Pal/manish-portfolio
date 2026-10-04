import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')

if (!root) throw new Error('Portfolio root element was not found')

hydrateRoot(root,
  <StrictMode>
    <App />
  </StrictMode>,
)
