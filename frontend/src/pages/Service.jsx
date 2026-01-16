import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Calendar } from "../components/ui/calendar";
import { bg } from "date-fns/locale";

const Service = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { backendUrl, getAppointments, services, token } = useContext(AppContext);

  // find service by slug (or type if you didn’t add slug)
  const service = services.find((s) => s.slug === type || s.type === type);

  // Default to today
  const [date, setDate] = useState(new Date());

  // Stores the list of available time strings for the selected date
  const [timeSlots, setTimeSlots] = useState([]);

  // Currently selected time slot
  const [slotTime, setSlotTime] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchBookedSlots = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/appointment/list");
      if (data.success) {
        // Only consider appointments that differ from cancelled
        setBookedSlots(data.appointments.filter((item) => !item.cancelled));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookedSlots();

    // Socket implementation for production
    const isProduction =
      window.location.hostname !== "localhost" &&
      !window.location.hostname.includes("127.0.0.1");
    if (isProduction && backendUrl) {
      const socketInstance = io(backendUrl, {
        transports: ["websocket", "polling"],
      });

      socketInstance.on("appointmentCreated", fetchBookedSlots);
      socketInstance.on("appointmentCancelled", fetchBookedSlots);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [backendUrl]);

  const getAvailableSlots = async () => {
    setTimeSlots([]);
    setSlotTime(""); // Reset selected time when date changes (if you prefer)

    if (!date) return;

    // Getting current date info from selected date
    let currentDate = new Date(date);
    let dayOfWeek = currentDate.getDay(); // 0 = Sun, 6 = Sat

    // Check if weekend (if you want to disable checking logic or just rely on Calendar disabled days)
    // Note: If you disable days in Calendar, this function won't be called for them usually, 
    // but good to keep safe.
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend - no slots
      return;
    }

    // Setting end time of the date (19:00)
    let workingDayEnd = new Date(currentDate);
    workingDayEnd.setHours(19, 0, 0, 0);

    // Setting start hours
    let slotTimePointer = new Date(currentDate);
    const today = new Date();

    // Check if selected date is "today" (compare dates)
    const isToday =
      today.getDate() === currentDate.getDate() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    if (isToday) {
      // If today, start from now (rounded to next 30 min), but not before 10 AM
      const now = new Date();
      let startHour = now.getHours();
      let startMin = now.getMinutes();

      if (startMin > 30) {
        startHour += 1;
        startMin = 0;
      } else if (startMin > 0) {
        startMin = 30;
      }

      if (startHour < 10) {
        startHour = 10;
        startMin = 0;
      }

      slotTimePointer.setHours(startHour, startMin, 0, 0);
    } else {
      slotTimePointer.setHours(10, 0, 0, 0);
    }

    let slots = [];
    while (slotTimePointer < workingDayEnd) {
      // If pointer is past working hours due to "now", loop won't run.
      // But also check if slotTimePointer is actually in the future if it is today.
      // (The startHour logic handles most, but let's be safe)
      if (isToday && slotTimePointer < new Date()) {
        slotTimePointer.setMinutes(slotTimePointer.getMinutes() + 30);
        continue;
      }

      let formattedTime = slotTimePointer.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      let day = slotTimePointer.getDate();
      let month = slotTimePointer.getMonth() + 1;
      let year = slotTimePointer.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      // Check if slot is available
      const isSlotAvailable = bookedSlots.every((booking) => {
        if (booking.slotDate === slotDate) {
          return booking.slotTime !== formattedTime;
        }
        return true;
      });

      if (isSlotAvailable) {
        slots.push({
          dateTime: new Date(slotTimePointer),
          time: formattedTime,
        });
      }

      // Update next slot by 30 mins
      slotTimePointer.setMinutes(slotTimePointer.getMinutes() + 30);
    }

    setTimeSlots(slots);
  };

  useEffect(() => {
    if (bookedSlots.length >= 0 && service && date) {
      getAvailableSlots();
    }
  }, [bookedSlots, service, date]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return <h2 className="text-center text-red-500">Service not found</h2>;
  }

  const bookAppointment = async () => {
    try {
      if (!token) {
        toast.warn("Моля, влезте в профила си, за да запазите час");
        return navigate("/login");
      }

      if (!slotTime) {
        return toast.warn("Моля, изберете час");
      }

      // We use 'date' state
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/appointment/book",
        {
          serviceData: service,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointments");
        getAvailableSlots();
        getAppointments();
        setSlotTime("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Helper to disable weekends and past dates
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today || // Past dates
      date.getDay() === 0 || // Sunday
      date.getDay() === 6 // Saturday
    );
  };

  return (
    <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Service details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col">
          <h1 className="text-gold text-4xl md:text-5xl font-bold mb-2">
            {service.type}
          </h1>
          <span className="text-gray-400 text-sm">Времетраене: ~45 мин</span>
        </div>
        <span className="text-gold text-3xl font-bold">{service.fee}€</span>
      </div>

      <img
        src={service.image}
        alt={service.type}
        className="rounded-2xl mb-8 w-full max-h-[600px] object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
      />

      <div className="prose prose-invert max-w-none mb-10">
        <p className="text-gray-400 text-lg leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Booking Section */}
      <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="p-8 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CalendarIcon className="text-amber-500" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight ">
                Запазете своя <span className="text-amber-500">час</span>
              </h3>
              <p className="text-gray-500 text-sm italic">
                Изберете най-удобното време за посещение
              </p>
            </div>
          </div>
          {slotTime && (
            <div className="flex items-center gap-2 bg-white border border-amber-200 px-4 py-2 rounded-xl text-amber-600 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
              <Clock size={16} className="text-amber-500" />
              <span className="text-gray-600 text-sm font-medium">
                Избран час:
              </span>
              <span className="text-gray-900 font-bold">{slotTime}</span>
            </div>
          )}
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Days Selection (Calendar) */}
          <div className="flex flex-col items-center">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-4 block w-full text-left ml-2">
              1. ИЗБЕРЕТЕ ДАТА
            </label>
            <div className="flex justify-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={bg}
                disabled={isDateDisabled}
                className="rounded-md"
                classNames={{
                  head_cell: "text-muted-foreground w-10 font-normal text-[0.8rem] text-gray-500",
                  cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-amber-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors text-gray-700",
                  day_selected: "!bg-amber-500 !text-white hover:bg-amber-600 hover:text-white focus:bg-amber-600 focus:text-white shadow-lg shadow-amber-500/20",
                  day_today: "bg-gray-100 text-amber-600 font-bold border border-amber-200/50",
                  day_outside: "text-gray-300 opacity-50",
                  day_disabled: "text-gray-300 opacity-30",
                }}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-4 block">
              2. НАЛИЧНИ ЧАСОВЕ {date && `ЗА ${date.toLocaleDateString('bg-BG')}`}
            </label>

            <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto content-start pr-2 custom-scrollbar">
              {timeSlots.length > 0 ? (
                timeSlots.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-bold shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 border ${item.time === slotTime
                        ? "bg-gradient-to-r from-amber-400 to-amber-600 border-transparent text-white shadow-lg shadow-amber-500/20 scale-105"
                        : "bg-white border-gray-100 text-gray-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                  >
                    {item.time}
                  </button>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                  <Clock className="text-gray-300 mb-2" size={32} />
                  <p className="text-gray-400 italic">
                    {date && (date.getDay() === 0 || date.getDay() === 6)
                      ? "Салонът не работи през уикенда."
                      : "Няма свободни часове за тази дата."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-gray-50 border-t border-gray-200">
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest mb-1">
              Обща цена
            </p>
            <p className="text-4xl font-black text-gray-800">{service.fee}€</p>
          </div>

          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`group relative flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-black text-lg transition-all duration-300 overflow-hidden ${slotTime
                ? "bg-gradient-to-r from-amber-400 to-amber-600 shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <span>Запази час</span>
            <ChevronRight
              size={20}
              className={`transition-transform duration-300 ${slotTime ? "group-hover:translate-x-1" : "opacity-30"
                }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Service;


