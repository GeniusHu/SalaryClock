import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { useState } from 'react';

function App() {
  const [shouldUpdate, setShouldUpdate] = useState(0);

  const handleSettingsUpdate = () => {
    setShouldUpdate(prev => prev + 1);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-primary text-gray-800">
          <Header onSettingsUpdate={handleSettingsUpdate} />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Dashboard key={shouldUpdate} />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
