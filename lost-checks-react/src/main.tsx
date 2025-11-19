import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { LandingPage } from './pages/LandingPage'
import { ServicesPage } from './pages/ServicesPage'
import { AffidavitFormPage } from './pages/AffidavitFormPage'
import { RequestsDashboard } from './pages/RequestsDashboard'
import { PacketPreviewPage } from './pages/PacketPreviewPage'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/affidavit/new" element={<AffidavitFormPage />} />
          <Route path="/affidavit/packet-preview/:id" element={<PacketPreviewPage />} />
          <Route path="/requests" element={<RequestsDashboard />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
