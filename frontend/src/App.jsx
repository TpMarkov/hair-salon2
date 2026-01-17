import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// Eagerly load the Home page as it's the primary landing page
import Home from "./pages/Home.jsx";

// Lazy load other pages
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const MyAppointments = lazy(() => import("./pages/MyAppointments.jsx"));
const MyProfile = lazy(() => import("./pages/MyProfile.jsx"));
const Service = lazy(() => import("./pages/Service.jsx"));
const Appointment = lazy(() => import("./pages/Appointment.jsx"));

import Navbar from "./components/Navbar.jsx";
import ServicesList from "./components/ServicesList.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div
      className={"w-full overflow-x-hidden touch-pan-y overscroll-x-none px-5"}
    >
      <ToastContainer position="top-right" theme="dark" />
      <Navbar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/service/:type" element={<Service />} />
          {import.meta.env.VITE_APP_BUNDLE !== 'BASIC' && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/services-list" element={<ServicesList />} />
              <Route path="/appointment/:type" element={<Appointment />} />
            </>
          )}
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
