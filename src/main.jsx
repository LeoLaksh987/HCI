import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../src/auth/AuthContext.jsx';
import { AccessibilityProvider } from './AccessibilityContext.jsx';
import   AccessibilityWidget  from './AccessibilityWidget.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AccessibilityProvider>
        <App />
      <AccessibilityWidget />
      </AccessibilityProvider>
    </AuthProvider>
  </StrictMode>,
)
