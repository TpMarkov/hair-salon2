import React from 'react'
import Header from "../components/Header.jsx";
import Services from "./Service.jsx";
import ServicesMenu from "../components/ServicesMenu.jsx";
import ServicesList from "../components/ServicesList.jsx";
import Banner from "../components/Banner.jsx";

const Home = () => {
  return (
      <div>
        <Header/>
        <ServicesMenu/>
        <Banner/>
        <ServicesList/>
      </div>
  )
}
export default Home
