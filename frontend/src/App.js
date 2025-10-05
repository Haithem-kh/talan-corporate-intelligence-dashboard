import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InetumDashboard from './components/inetum-dashboard/InetumDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InetumDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
