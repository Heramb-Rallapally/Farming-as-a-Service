import React from 'react';
import FarmerSignup from './components/FarmerSignup';
import FarmerLogin from './components/FarmerLogin';
import FarmerHome from './components/FarmerHome';
import Home from './components/Home';
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
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/FarmerSignup" element={<FarmerSignup />} />
          <Route exact path="/FarmerLogin" element={<FarmerLogin/>} />
          <Route path="/:username" element={<FarmerHome />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
