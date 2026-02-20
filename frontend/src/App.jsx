import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme/theme'
import Landing from './pages/Landing'
import PricingOptimization from './pages/PricingOptimization'
import ProductManagement from './pages/ProductManagement'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/pricing" element={<PricingOptimization/>} />
          <Route path="/products" element={<ProductManagement/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
