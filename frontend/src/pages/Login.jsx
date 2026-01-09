import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState("Sign Up")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const imageRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    // Implementation will be added later as requested
  }

  return (
    <div ref={sectionRef} className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-gray-100">

        {/* Left Side: Image (Hidden on mobile) */}
        <div ref={imageRef} className="hidden lg:block relative h-full min-h-[600px]">
          <img
            src="/images/login_hero.png"
            alt="Salon Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
            <h2 className="text-5xl font-bold mb-6 drop-shadow-lg logo-font">Добре дошли</h2>
            <p className="text-xl font-light max-w-md drop-shadow-md">
              {state === "Sign Up"
                ? "Създайте нов профил и се насладете на нашите премиум услуги."
                : "Влезте в профила си, за да управлявате вашите часове."}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div ref={formRef} className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight uppercase">
              {state === "Sign Up" ? "Регистрирайте се" : "Влез в профила си"}
            </h1>
            <div className="w-20 h-1 bg-primary-gradient mt-2 rounded-full mx-auto lg:mx-0" />
            <p className="mt-4 text-gray-500">
              Моля {state === "Sign Up" ? "въведете данните си" : "влезте в профила си"}, за да запазите своя час.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {state === "Sign Up" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Име и Фамилия</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50/50"
                  placeholder="Иван Иванов"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email адрес</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50/50"
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Парола</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50/50 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary-middle/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 mt-4"
            >
              {state === "Sign Up" ? "СЪЗДАЙ ПРОФИЛ" : "ВХОД"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            {state === "Sign Up"
              ? (
                <p>
                  Вече имате профил?{" "}
                  <button
                    onClick={() => setState("Login")}
                    className="text-primary-middle font-bold hover:underline cursor-pointer"
                  >
                    Влезте тук
                  </button>
                </p>
              )
              : (
                <p>
                  Нямате профил?{" "}
                  <button
                    onClick={() => setState("Sign Up")}
                    className="text-primary-middle font-bold hover:underline cursor-pointer"
                  >
                    Регистрирайте се
                  </button>
                </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
