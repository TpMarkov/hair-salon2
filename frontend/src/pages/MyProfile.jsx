import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { User, Mail, Phone, Edit2, Check, Camera } from 'lucide-react'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Tsvetan Markov",
    image: "/images/avatar.png",
    email: "markowcvetan@gmail.com",
    phone: "+359 881 234 567",
  })

  const [isEdit, setIsEdit] = useState(false)
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      gsap.from(avatarRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.3
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div ref={cardRef} className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* Profile Header Background */}
        <div className="h-32 bg-primary-gradient relative" />

        <div className="px-8 pb-12">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start sm:flex-row sm:gap-6">
            <div ref={avatarRef} className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEdit && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-20 text-center sm:text-left flex-1">
              {isEdit ? (
                <input
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 focus:outline-none bg-transparent w-full"
                  type="text"
                  autoFocus
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {userData.name}
                </h1>
              )}
              <div className="w-16 h-1 bg-primary-gradient mt-2 rounded-full mx-auto sm:mx-0" />
            </div>

            <div className="mt-6 sm:mt-20">
              <button
                onClick={() => setIsEdit(!isEdit)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${isEdit
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-primary-gradient text-white"
                  }`}
              >
                {isEdit ? (
                  <>
                    <Check size={18} />
                    <span>ГОТОВО</span>
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    <span>РЕДАКТИРАЙ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <hr className="border-gray-100 mb-10" />

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 text-center sm:text-left">
              <p className="text-sm font-bold text-gold uppercase tracking-widest">Основна Информация</p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Email адрес</p>
                    <p className="text-gray-700 font-medium">{userData.email}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Phone size={20} />
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    <p className="text-xs text-gray-400 font-medium">Телефонен номер</p>
                    {isEdit ? (
                      <input
                        value={userData.phone}
                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full text-gray-700 font-medium border-b border-gray-200 focus:border-yellow-500 focus:outline-none py-1 bg-transparent"
                        type="text"
                      />
                    ) : (
                      <p className="text-gray-700 font-medium">{userData.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center sm:text-left">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Статус на профила</p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-gray-700">Активен Клиент</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Благодарим Ви, че избрахте нашия салон. Вашите данни се използват единствено за потвърждение на резервации.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
