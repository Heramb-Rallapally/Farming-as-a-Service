import React from 'react';
import Home from './components/Home';
import FarmerSignup from './components/FarmerSignup';
import FarmerLogin from './components/FarmerLogin';
import FarmerHome from './components/FarmerHome';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import FarmerProduce from './components/FarmerProduce';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/FarmerSignup" element={<FarmerSignup />} />
          <Route path="/FarmerLogin" element={<FarmerLogin />} />
          <Route path="/Adminlogin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/:username/Produce" element={<FarmerProduce />} />
          <Route path="/:username" element={<FarmerHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
