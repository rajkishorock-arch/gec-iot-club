import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClubProvider } from './context/ClubContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClubProvider>
      <App />
    </ClubProvider>
  </StrictMode>,
)
