import React from 'react'
import {services} from "../assets/assets.js"
import {useNavigate} from "react-router-dom"

const ServicesMenu = () => {
  const topServices = services.slice(0, 3)
  const navigate = useNavigate();

  return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-gold text-4xl md:text-5xl font-bold mb-4">
            Нашите най-популярни услуги
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Открий услугите, които клиентите ни обичат и избират отново и отново
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {topServices.map((service, index) => (
              <div
                  onClick={() => navigate(`/service/${service.type}`)}
                  key={service.serviceId || index}
                  className="group relative cursor-pointer"
              >
                <div
                    className="overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-2xl transition-all duration-500 group-hover:shadow-gold/20 group-hover:-translate-y-2">
                  <img
                      src={service.image}
                      alt={service.type}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-gold font-medium">Научи повече →</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-gold text-xl font-semibold transition-colors duration-300">
                    {service.type}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Времетраене: ~45 мин</span>
                    <span className="text-gold font-bold text-lg">{service.fee}€</span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>
  )
}
export default ServicesMenu
