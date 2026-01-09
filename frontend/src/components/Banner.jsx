import React from 'react'
import {useNavigate} from 'react-router-dom'
import {UserPlus} from 'lucide-react'

const Banner = () => {
  const navigate = useNavigate()

  return (
      <div
          className="relative overflow-hidden rounded-3xl bg-black/40 border border-white/5 shadow-2xl my-20 mx-4 md:mx-10 group">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"/>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Left Side: Content */}
          <div className="flex-1 py-12 px-8 sm:px-12 md:py-20 lg:py-28 lg:pl-16">
            <div className="max-w-xl space-y-6">
              <h2 className="text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Запази час за <br className="hidden sm:block"/>
                <span className="text-white">съвършена визия</span>
              </h2>

              <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed">
                Присъедини се към нашите доволни клиенти и се възползвай от професионална грижа за твоята коса.
              </p>

              <button
                  onClick={() => navigate('/login')}
                  className="group flex items-center gap-3 bg-primary-gradient px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <UserPlus size={24}/>
                Създай профил
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 relative h-[300px] md:h-auto self-stretch">
            <img
                src="/images/banner-refined.png"
                alt="Premium Hair Salon"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay to blend image with content */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:block hidden"/>
            <div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden block"/>
          </div>
        </div>
      </div>
  )
}

export default Banner
