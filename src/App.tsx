/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceCityPage from './pages/ServiceCityPage';
import PromisePage from './pages/PromisePage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import CredentialsPage from './pages/CredentialsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/services/:slug/:city" element={<ServiceCityPage />} />
            <Route path="/our-promise" element={<PromisePage />} />
            <Route path="/service-area" element={<ServiceAreaPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
