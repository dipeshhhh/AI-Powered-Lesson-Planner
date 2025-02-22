import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import 'dotenv/config';
import { LoginProvider } from './contexts/LoginContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </StrictMode>,
)
