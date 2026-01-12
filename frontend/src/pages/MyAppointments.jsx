import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import {
  Calendar,
  Clock,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { appointments, backendUrl, getAppointments, token } =
    useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const cancelAppointment = async (appointmentId) => {
    try {
      if (window.confirm("Сигурни ли сте, че искате да отмените този час?")) {
        const { data } = await axios.post(
          backendUrl + "/api/appointment/cancel",
          { appointmentId },
          { headers: { token } }
        );
        if (data.success) {
          toast.success(data.message, { position: "bottom-center" });
          getAppointments();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          МОИТЕ <span className="text-gold">ЧАСОВЕ</span>
        </h1>
        <div className="w-24 h-1 bg-primary-gradient mx-auto mt-4 rounded-full" />
      </div>

      <div className="space-y-6">
        {currentAppointments.length > 0 ? (
          currentAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl transition-all duration-300 hover:bg-white/10 group"
            >
              {/* Left: Small Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-2xl shadow-lg border border-white/20">
                <img
                  src={item.serviceData.image}
                  alt={item.serviceData.type}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Center: Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="text-xl font-bold text-gold">
                  {item.serviceData.type}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.serviceData.shortDescription}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Calendar size={14} className="text-amber-500" />
                    <span>{item.slotDate.replace(/_/g, "/")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Clock size={14} className="text-amber-500" />
                    <span>{item.slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Right: Fee & Action */}
              <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
                <p className="text-2xl font-black text-white">
                  {item.serviceData.fee}€
                </p>
                {!item.cancelled ? (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center gap-2 px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 group/btn"
                  >
                    <Trash2
                      size={16}
                      className="transition-transform group-hover/btn:rotate-12"
                    />
                    <span>Откажи</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-6 py-2 rounded-xl text-red-500"
                  >
                    Отменен
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlusCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">
              Все още нямате записани часове
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Разгледайте нашите услуги и запишете своя първи час бързо и лесно.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-gradient text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <PlusCircle size={20} />
              <span>Запиши час</span>
            </button>
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
  );
};

export default MyAppointments;
