import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Staff from './components/Staff';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './components/admin/AdminLogin';
import CEODashboard from './components/admin/dashboards/CEODashboard';
import SecretaryDashboard from './components/admin/dashboards/SecretaryDashboard';
import ProgrammerDashboard from './components/admin/dashboards/ProgrammerDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import './App.css';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <AboutUs />
      <Products />
      <Staff />
      <Contact />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route element={<ProtectedRoute allowedRoles={['CEO']} />}>
          <Route path="/admin/ceo" element={<CEODashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Secretary', 'CEO']} />}>
          <Route path="/admin/secretary" element={<SecretaryDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Programmer', 'CEO']} />}>
          <Route path="/admin/programmer" element={<ProgrammerDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
