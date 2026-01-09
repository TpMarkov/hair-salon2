import {Routes, Route} from "react-router-dom"
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Service from "./pages/Service.jsx";
import Appointment from "./pages/Appointment.jsx";
import Navbar from "./components/Navbar.jsx";
import ServicesList from "./components/ServicesList.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
      <div className={"mx-4 sm:mx-[10%]"}>
        <Navbar/>
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<Contact/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/my-appointments" element={<MyAppointments/>}/>
          <Route path="/my-profile" element={<MyProfile/>}/>
          <Route path="/services-list" element={<ServicesList/>}/>
          <Route path="/service/:type" element={<Service/>}/>
          <Route path="/appointment/:type" element={<Appointment/>}/>
        </Routes>
        <Footer/>
      </div>
  )
}

export default App
