import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles'
import { THEME } from './constants/index.ts'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider
      theme={THEME}
      modeStorageKey="mode-toggle-demo"
      disableNestedContext
    >
      <App />
    </CssVarsProvider>
  </StrictMode>,
)
