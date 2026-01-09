import React, { useState, useEffect } from 'react'
import { navLinks } from "../assets/assets.js";
import { NavLink } from "react-router-dom";
import useIsMobile from "../hooks/use-is-mobile.ts";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isMobile } = useIsMobile()
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMenu]);


  return (
    <div
      className={`nav-bar z-50 sticky top-0 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-sm border-b-white/20' : 'bg-transparent'}`}>
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <a href="/">
          <img src="/images/logo.png" alt="logo" className="w-15 h-15 cursor-pointer" />
        </a>
        <p className={"logo-font text-xl text-gold"}>Hair
          Salon</p>
      </div>
      <ul className={`hidden md:flex items-start gap-5 font-medium`}>
        {navLinks.map((navlink, index) => (

          <li key={index} className="uppercase tracking-tight">
            <NavLink
              to={navlink.href}
              className={({ isActive }) =>
                `flex flex-col items-center hover:text-yellow-500`
              }
            >
              {({ isActive }) => (
                <>
                  <p>{navlink.title}</p>
                  {isActive && (
                    <hr className="mt-1 h-0.5 w-3/5 bg-yellow-500" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {token ? <div className={"flex items-center gap-1 cursor-pointer group relative"}>
          <img src={"/images/avatar.png"} alt={"user-image"}
            className={"w-10 rounded-full "}
          />
          <ChevronDown className="hidden md:block" />
          <div
            className={"absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block"}>
            <div className={"min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4"}>
              <p onClick={() => navigate("/my-profile")} className={"hover:text-black cursor-pointer"}
              >Моят профил</p>
              <p onClick={() => navigate("/my-appointments")} className={"hover:text-black cursor-pointer"}
              >Моите часове</p>
              <p onClick={() => {
                setToken(false);
                navigate("/")
              }} className={"hover:text-black cursor-pointer"}
              >Излизане</p>
            </div>
          </div>
        </div>
          :
          <button onClick={() => navigate("/login")}
            className={"bg-primary-gradient text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"}>Регистрирай се
          </button>
        }

        {/* Burger Menu Icon (Mobile Only) */}
        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden p-2 text-gray-600 hover:text-gold transition-all duration-300 bg-white rounded-xl shadow-md border border-gray-100"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-white transition-all duration-500 ease-in-out transform ${showMenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } flex flex-col h-screen overflow-y-auto`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
            <p className="logo-font text-xl text-gold ml-3 font-bold">Hair Salon</p>
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className="p-3 text-gray-600 hover:text-red-500 transition-colors bg-gray-50 rounded-xl active:scale-95"
          >
            <X size={30} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 flex flex-col items-center justify-center py-12 gap-8 px-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `w-full text-center text-2xl font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 ${isActive
                  ? 'text-gold bg-amber-500/5 shadow-sm border border-gold/10'
                  : 'text-gray-500 hover:text-gold hover:bg-gray-50'
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full max-w-xs mt-6 bg-primary-gradient text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-amber-500/30 active:scale-95 transition-all"
            >
              Вход / Регистрация
            </button>
          )}
        </nav>

        {/* Menu Footer */}
        <div className="p-8 text-center border-t border-gray-50">
          <div className="flex justify-center gap-6 mb-4 text-gray-400">
            {/* Placeholders for social icons if needed */}
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            {new Date().getFullYear()} HAIR SALON. Всички права запазени.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
