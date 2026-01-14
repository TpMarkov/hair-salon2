import React from 'react'
import Header from "../components/Header.jsx";
import Services from "./Service.jsx";
import ServicesMenu from "../components/ServicesMenu.jsx";
import ServicesList from "../components/ServicesList.jsx";
import Banner from "../components/Banner.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <main>
      <Header />
      <p className="sr-only">
        Фризьорски салон в Ловеч, България. Адрес: Ловеч 5500.
        Професионални фризьорски услуги, подстригване, боядисване и терапии за коса.
      </p>
      <ServicesMenu />
      <Banner />
      <ServicesList />
      <ScrollToTop />
    </main>
  )
}
export default Home
