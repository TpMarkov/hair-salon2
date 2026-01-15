import React, { lazy, Suspense } from 'react'
import Header from "../components/Header.jsx";
import { useEffect } from "react";

// Lazy load components that are below the fold
const ServicesMenu = lazy(() => import("../components/ServicesMenu.jsx"));
const Banner = lazy(() => import("../components/Banner.jsx"));
const ServicesList = lazy(() => import("../components/ServicesList.jsx"));

// Simple component loader
const SectionLoader = () => <div className="h-40 flex items-center justify-center text-gold/50 italic py-10">Зареждане...</div>;

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

      <Suspense fallback={<SectionLoader />}>
        <ServicesMenu />
        <Banner />
        <ServicesList />
      </Suspense>
    </main>
  )
}
export default Home
