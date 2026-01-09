import React from 'react'
import { useNavigate } from "react-router-dom"
import { navLinks } from "../assets/assets.js"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-20 py-12 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

        {/* Left section - Logo and About */}
        <div className="flex-1 flex flex-col gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer group w-fit"
            onClick={() => {
              navigate("/")
              window.scrollTo(0, 0)
            }}
          >
            <img src="/images/logo.png" alt="logo" className="w-12 h-12 transition-transform group-hover:scale-105" />
            <p className="logo-font text-2xl text-gold">Hair Salon</p>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-sm">
            Повече от салон – място за стил, увереност и грижа. Работим с внимание към всеки детайл, защото вярваме, че красотата започва с правилното отношение.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-stone-50 rounded-full text-gray-400 hover:text-yellow-600 hover:bg-stone-100 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-stone-50 rounded-full text-gray-400 hover:text-yellow-600 hover:bg-stone-100 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-stone-50 rounded-full text-gray-400 hover:text-yellow-600 hover:bg-stone-100 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Center section - Navigation */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 uppercase tracking-widest">Салон</h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(link.href)
                  window.scrollTo(0, 0)
                }}
                className="text-gray-500 hover:text-yellow-600 cursor-pointer transition-colors w-fit"
              >
                {link.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right section - Contact Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 uppercase tracking-widest">Контакти</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-gray-500 group">
              <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                <Phone size={18} />
              </div>
              <span className="group-hover:text-gray-800 transition-colors">+359 888 123 456</span>
            </li>
            <li className="flex items-center gap-3 text-gray-500 group">
              <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                <Mail size={18} />
              </div>
              <span className="group-hover:text-gray-800 transition-colors">hello@hairsalon.bg</span>
            </li>
            <li className="flex items-center gap-3 text-gray-500 group">
              <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
                <MapPin size={18} />
              </div>
              <span className="group-hover:text-gray-800 transition-colors">ул. „Примерна“ 123, София</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Hair Salon. Всички права запазени.
        </p>
      </div>
    </footer>
  )
}

export default Footer
