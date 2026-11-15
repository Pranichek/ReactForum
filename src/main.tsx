import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { baseAPI } from './api/baseApi'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider api={baseAPI}>
      <App/>
    </ApiProvider>
  </StrictMode>,
)
