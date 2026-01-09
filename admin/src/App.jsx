import React, { useContext } from 'react'
import Login from "./pages/Login.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import ServicesList from "./pages/ServicesList.jsx";

const App = () => {
  const { adminToken, sideBarCollapsed } = useContext(AdminContext);

  return adminToken ? (
    <div className="admin-layout">
      <ToastContainer />
      <Navbar />
      <main className={`admin-main-content pt-16 md:pt-0 transition-all duration-300 ${sideBarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services-list" element={<ServicesList />} />
        </Routes>
      </main>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}
export default App
