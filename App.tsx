
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { TourDetail } from './pages/TourDetail';
import { Dashboard } from './pages/Dashboard';
import { MapExplorer } from './pages/MapExplorer';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';
import { AppProvider } from './context/AppContext';
import { AIChatWidget } from './components/AIChatWidget';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <AIChatWidget />
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
