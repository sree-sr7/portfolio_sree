import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts — replaces the two fonts.googleapis.com <link> tags removed from index.html.
// Plus Jakarta Sans: only weights actually applied in the codebase (400 default, 700 font-bold).
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/700.css'
// JetBrains Mono: weight 400 for plain font-mono elements, 700 for font-mono + font-bold
// (confirmed across DesignMono.jsx, ProjectModal.jsx, BlueprintPhoto.jsx — 9 elements use both).
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
