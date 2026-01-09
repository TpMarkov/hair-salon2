import React from 'react'
import {ChevronRight} from 'lucide-react';
import Service from "../pages/Service.jsx";

const Header = () => {
  return (
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden rounded-2xl shadow-2xl">
        {/* Background Image */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110"
            style={{backgroundImage: "url('/images/hero-bg.png')"}}
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"/>

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Погрижете се за <span className="text-gold whitespace-nowrap">косата си</span> <br/>
            запазете своя час при нашия екип
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            Просто разгледайте нашия богат списък с фризьорски услуги и запазете своя час бързо и лесно.
            Вашата красота е нашата мисия.
          </p>

          <a
              href="#services"
              className="group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
          >
            Запазете своя час
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24}/>
          </a>
        </div>
      </div>
  )
}
export default Header
