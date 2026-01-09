import React, { useContext, useState } from 'react'
import { AppContext } from "../context/AppContext.jsx";
import { Calendar, Clock, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const MyAppointments = () => {
  const { services } = useContext(AppContext)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(services.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          МОИТЕ <span className="text-gold">ЧАСОВЕ</span>
        </h1>
        <div className="w-24 h-1 bg-primary-gradient mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6">
        {currentServices.length > 0 ? (
          currentServices.map((service, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl transition-all duration-300 hover:bg-white/10 group"
            >
              {/* Left: Small Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-2xl shadow-lg border border-white/20">
                <img
                  src={service.image}
                  alt={service.type}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Center: Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="text-xl font-bold text-gold">
                  {service.type}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Calendar size={14} className="text-amber-500" />
                    <span>25 Януари, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Clock size={14} className="text-amber-500" />
                    <span>08:30 AM</span>
                  </div>
                </div>
              </div>

              {/* Right: Fee & Action */}
              <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
                <p className="text-2xl font-black text-white">
                  {service.fee}€
                </p>
                <button
                  className="flex items-center gap-2 px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 group/btn"
                >
                  <Trash2 size={16} className="transition-transform group-hover/btn:rotate-12" />
                  <span>Откажи</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Нямате запазени часове.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-xl transition-all duration-300 ${currentPage === 1
                ? "text-gray-600 bg-white/5 cursor-not-allowed opacity-50"
                : "text-white bg-white/10 hover:bg-primary-gradient border border-white/10 cursor-pointer"
              }`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${currentPage === i + 1
                    ? "bg-primary-gradient text-white shadow-lg shadow-amber-500/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-xl transition-all duration-300 ${currentPage === totalPages
                ? "text-gray-600 bg-white/5 cursor-not-allowed opacity-50"
                : "text-white bg-white/10 hover:bg-primary-gradient border border-white/10 cursor-pointer"
              }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAppointments
