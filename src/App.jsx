import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { trackPageView } from './utils/analytics';

// 路由变化跟踪组件
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  const [shouldUpdate, setShouldUpdate] = useState(0);

  const handleSettingsUpdate = () => {
    setShouldUpdate(prev => prev + 1);
  };

  return (
    <HelmetProvider>
      <Router>
        <RouteTracker />
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
