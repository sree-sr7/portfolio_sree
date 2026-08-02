import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts — replaces the two fonts.googleapis.com <link> tags removed from index.html.
// Latin-only subsets: this portfolio has no cyrillic/greek/vietnamese content; latin covers everything.
// font-display is overridden to 'optional' in index.css (imported below) to eliminate the
// mobile CLS reflow caused by the default 'swap' behaviour on slower connections.
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
// JetBrains Mono: weight 400 for plain font-mono elements, 700 for font-mono + font-bold
// (confirmed across DesignMono.jsx, ProjectModal.jsx, BlueprintPhoto.jsx — 9 elements use both).
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
