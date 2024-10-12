import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NationalitiesProvider } from './Nationalities.jsx'
import { FlashProvider } from './FlashContext.jsx'
import FlashMessages from './Components/FlashMessages.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlashProvider>
      <NationalitiesProvider>
        <FlashMessages />
        <App />
      </NationalitiesProvider>
    </FlashProvider>
  </StrictMode>,
)
