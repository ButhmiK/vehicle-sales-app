import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VehicleManagement from './pages/VehicleManagement';
import CustomerManagement from './pages/CustomerManagement';
import AdvancePayment from './pages/AdvancePayment';
import SalesRecords from './pages/SalesRecords';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="flex items-center justify-center "> 
  <div className=" max-w p-6 bg-white rounded-2xl shadow-lg text-center">
    <h1 className="text-3xl font-extrabold text-blue-700  animate-fade-in">
      Super Mobile Car Sales
    </h1><br/>
    <p className="mb-3 text-gray-70  animate-slide-in-up">
      Welcome to the <span className="font-semibold text-blue-600">Super Mobile Car Sales</span> application. Here you can manage vehicles, customers, payments, and sales records.
    </p>
  </div>
</div>
<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles" element={<VehicleManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/payments" element={<AdvancePayment />} />
          <Route path="/sales" element={<SalesRecords />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;