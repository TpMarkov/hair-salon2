import React from 'react'
import { ChevronRight } from 'lucide-react';
import Service from "../pages/Service.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="relative h-[550px] md:h-[650px] lg:h-[800px] w-[calc(100%+2.5rem)] mx-[-1.25rem] overflow-hidden group">
      {/* Background Image - Optimized for LCP discovery with <img> tag and fetchpriority */}
      <img
        src="/images/hero_bg_optimized.png"
        alt=""
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-start justify-center pl-[calc(2rem+1.25rem)] md:pl-[calc(4rem+1.25rem)] lg:pl-[calc(6rem+1.25rem)] pr-8 z-10 max-w-7xl">
        {/* Basic */}
        {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Погрижете се за <span className="text-gold whitespace-nowrap">косата си</span> <br />
          запазете своя час при нашия екип
        </h1> */}

        {/* Optimized SEO */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Фризьорски салон в <span className="text-gold">Ловеч</span><br />
          професионална грижа за вашата коса
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
          Просто разгледайте нашия богат списък с фризьорски услуги и запазете своя час бързо и лесно.
          Вашата красота е нашата мисия.
        </p>

        {userData ? <a
          href="#services"
          className="group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
        >
          Запазете своя час
          <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
        </a> : <button onClick={() => navigate("/login")}
          className={"group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"}>Регистрирай
          се</button>}

      </div>
    </div>
  )
}
export default Header
