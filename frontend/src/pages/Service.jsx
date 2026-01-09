import React, {useEffect, useState, useRef} from 'react'
import {useParams} from "react-router-dom"
import {services} from "../assets/assets.js"
import {ChevronRight, Calendar, Clock, ChevronLeft} from "lucide-react"

const Service = () => {
  const [serviceSlots, setServiceSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")
  const daysOfWeek = ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб",]

  const daysRef = useRef(null)
  const timesRef = useRef(null)

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      ref.current.scrollBy({left: scrollAmount, behavior: "smooth"});
    }
  }

  const {type} = useParams()

  // find service by slug (or type if you didn’t add slug)
  const service = services.find(
      s => s.slug === type || s.type === type
  )


  if (!service) {
    return <h2 className="text-center text-red-500">Service not found</h2>
  }

  const getAvailableSlots = async () => {
    setServiceSlots([])

    // Getting current date
    let today = new Date();
    let allSlots = []
    let daysChecked = 0

    while (allSlots.length < 7) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + daysChecked);

      let dayOfWeek = currentDate.getDay(); // 0 = Sun, 6 = Sat

      // Skip weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Setting end time of the date
        let endTime = new Date(currentDate)
        endTime.setHours(19, 0, 0, 0)

        // Setting start hours
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        } else {
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        }

        let timeSlots = []
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})

          // Add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          })

          // Update next slot by 30 mins
          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        // Only add if there are slots available for that day
        if (timeSlots.length > 0) {
          allSlots.push(timeSlots)
        }
      }
      daysChecked++
    }
    setServiceSlots(allSlots)
  }

  useEffect(() => {
    getAvailableSlots()
    window.scrollTo(0, 0)
  }, [service])


  useEffect(() => {
    console.log(serviceSlots)
  }, [serviceSlots]);


  return (
      <section className="py-20 max-w-5xl mx-auto">
        {/* Service details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col">
            <h1 className="text-gold text-4xl md:text-5xl font-bold mb-2">
              {service.type}
            </h1>
            <span className="text-gray-400 text-sm">Времетраене: ~45 мин</span>
          </div>
          <span className="text-gold text-3xl font-bold">
          {service.fee}€
        </span>
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
        <div
            className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-2xl">
                <Calendar className="text-amber-500" size={24}/>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-400 mb-1 tracking-tight ">
                  Запазете своя <span className="text-gold">час</span>
                </h3>
                <p className="text-gray-400 text-sm italic">Изберете най-удобното време за посещение</p>
              </div>
            </div>
            {slotTime && (
                <div
                    className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4 duration-500">
                  <Clock size={16} className="text-amber-500"/>
                  <span className="text-amber-500 text-sm font-medium">Избран час:</span>
                  <span className="text-gray-400 font-bold">{slotTime}</span>
                </div>
            )}
          </div>

          {/* Days Selection */}
          <div className="mb-10">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-4 block">
              1. ИЗБЕРЕТЕ ДЕН
            </label>
            <div className="relative group/nav">
              <button
                  onClick={() => scrollContainer(daysRef, "left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover/nav:opacity-100 md:opacity-100 transition-opacity hidden sm:flex items-center justify-center -ml-4 shadow-xl active:scale-90"
              >
                <ChevronLeft size={20}/>
              </button>

              <div
                  ref={daysRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 snap-x"
              >
                {serviceSlots && serviceSlots.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                          setSlotIndex(index)
                          setSlotTime("")
                        }}
                        className={`flex flex-col items-center justify-center min-w-[75px] py-5 rounded-2xl cursor-pointer transition-all duration-300 border snap-start ${slotIndex === index
                            ? "bg-primary-gradient border-transparent text-white shadow-xl shadow-amber-500/20 scale-105"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10 shadow-sm"
                        }`}
                    >
                  <span className="text-[10px] uppercase font-bold tracking-tighter mb-1 opacity-70">
                    {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                  </span>
                      <span className="text-xl font-black">
                    {item[0] && item[0].dateTime.getDate()}
                  </span>
                    </div>
                ))}
              </div>

              <button
                  onClick={() => scrollContainer(daysRef, "right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover/nav:opacity-100 md:opacity-100 transition-opacity hidden sm:flex items-center justify-center -mr-4 shadow-xl active:scale-90"
              >
                <ChevronRight size={20}/>
              </button>
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-12">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-4 block">
              2. НАЛИЧНИ ЧАСОВЕ
            </label>
            <div className="relative group/nav">
              <button
                  onClick={() => scrollContainer(timesRef, "left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover/nav:opacity-100 md:opacity-100 transition-opacity hidden sm:flex items-center justify-center -ml-4 shadow-xl active:scale-90"
              >
                <ChevronLeft size={20}/>
              </button>

              <div
                  ref={timesRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 px-1 snap-x"
              >
                {serviceSlots.length > 0 && serviceSlots[slotIndex].map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSlotTime(item.time)}
                        className={`text-sm font-bold shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 border snap-start ${item.time === slotTime
                            ? "bg-primary-gradient border-transparent text-white shadow-lg shadow-amber-500/20 scale-105"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10"
                        }`}
                    >
                      {item.time}
                    </button>
                ))}
              </div>

              <button
                  onClick={() => scrollContainer(timesRef, "right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover/nav:opacity-100 md:opacity-100 transition-opacity hidden sm:flex items-center justify-center -mr-4 shadow-xl active:scale-90"
              >
                <ChevronRight size={20}/>
              </button>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Обща цена</p>
              <p className="text-4xl font-black text-gray-600">{service.fee}€</p>
            </div>

            <button
                onClick={() => {
                  if (!slotTime) return;
                  Notification.requestPermission().then(perm => {
                    if (perm === "granted") {
                      new Notification("Часът е запазен!", {
                        body: `Успешно запазихте час за ${service.type} на ${daysOfWeek[serviceSlots[slotIndex][0].dateTime.getDay()]} в ${slotTime}.`
                      })
                    }
                  })
                }}
                disabled={!slotTime}
                className={`group relative flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-black text-lg transition-all duration-300 overflow-hidden ${slotTime
                    ? "bg-primary-gradient shadow-2xl shadow-amber-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                    : "bg-white/10 text-gray-500 cursor-not-allowed opacity-50"
                }`}
            >
              <span>Запази час</span>
              <ChevronRight size={20}
                            className={`transition-transform duration-300 ${slotTime ? "group-hover:translate-x-1" : "opacity-30"}`}/>
            </button>
          </div>
        </div>

      </section>
  )
}

export default Service
