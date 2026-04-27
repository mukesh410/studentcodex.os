import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Oracle from './pages/Oracle';
import Synthesizer from './pages/Synthesizer';
import Architect from './pages/Architect';

function AppContent() {
  const location = useLocation();
  
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/oracle" element={<Oracle />} />
          <Route path="/synthesizer" element={<Synthesizer />} />
          <Route path="/architect" element={<Architect />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
