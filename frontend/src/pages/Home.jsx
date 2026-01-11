import React from 'react'
import Header from "../components/Header.jsx";
import Services from "./Service.jsx";
import ServicesMenu from "../components/ServicesMenu.jsx";
import ServicesList from "../components/ServicesList.jsx";
import Banner from "../components/Banner.jsx";
import {useEffect} from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
