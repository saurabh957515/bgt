import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NationalitiesProvider } from './Nationalities.jsx'
import { FlashProvider } from './FlashContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlashProvider>
      <NationalitiesProvider>
        <App />
      </NationalitiesProvider>
    </FlashProvider>
  </StrictMode>,
)
