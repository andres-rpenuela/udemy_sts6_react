import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Count } from './components/Contador'
import { ProductApp } from './components/ProductApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Count/> */}
    <ProductApp/>
  </StrictMode>,
)
