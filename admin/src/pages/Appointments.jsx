import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { RefreshCw, Wifi, WifiOff, CalendarX } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";

const Appointments = () => {
  const { adminToken, appointments, getAllAppointments, isConnected } =
    useContext(AdminContext);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Initial fetch when component mounts
  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
      setLastRefresh(new Date());
    }
  }, [adminToken]);

  useEffect(() => {
    if (appointments) {
      if (selectedDate) {
        // Try to match common formats. The 'slotDate' format from commonly used tutorials is "D_M_YYYY"
        const formattedDateUnderscore = format(selectedDate, "d_M_yyyy");
        const formattedDateDash = format(selectedDate, "d-M-yyyy");
        const formattedDateSlash = format(selectedDate, "d/M/yyyy");

        const filtered = appointments.filter(
          (item) =>
            item.slotDate === formattedDateUnderscore ||
            item.slotDate === formattedDateDash ||
            item.slotDate === formattedDateSlash
        );
        setFilteredAppointments(filtered);
      } else {
        setFilteredAppointments(appointments);
      }
    }
  }, [appointments, selectedDate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAllAppointments();
    setLastRefresh(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
  };

  return (
    <div className="w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight w-full sm:w-auto">
          All <span className="text-amber-600">Appointments</span>
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            <span>Refresh</span>
          </button>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {isConnected ? (
                <>
                  <Wifi size={16} className="text-green-500" />
                  <span className="text-green-600 font-medium hidden sm:inline">
                    Live
                  </span>
                </>
              ) : (
                <>
                  <WifiOff size={16} className="text-red-500" />
                  <span className="text-red-600 font-medium hidden sm:inline">
                    Offline
                  </span>
                </>
              )}
            </div>
            <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"
                  }`}
              ></div>
              <span className="hidden sm:inline">Updated:</span>
              <span>
                {lastRefresh.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Sidebar */}
        <div className="w-full lg:w-auto flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md mx-auto"
            />
            {selectedDate && (
              <button
                onClick={clearDateFilter}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all cursor-pointer font-medium"
              >
                <CalendarX size={16} />
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
          {/* Desktop Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 grid-flow-col py-4 px-6 border-b border-gray-100 bg-gray-50/50 font-semibold text-gray-700 sticky top-0 backdrop-blur-sm z-10">
            <p>#</p>
            <p>Service</p>
            <p>Date</p>
            <p>Time</p>
            <p>Booking Date</p>
            <p>Price</p>
            <p>Action</p>
          </div>

          {filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, index) => (
              <div
                className="flex flex-col sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 items-start sm:items-center text-gray-500 py-4 px-4 sm:px-6 border-b border-gray-100 hover:bg-gray-50 transition-all"
                key={index}
              >
                <p className="max-sm:hidden font-medium text-gray-400">
                  {index + 1}
                </p>

                {/* Produc/Service Info */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-base sm:text-sm">
                        {item.serviceData.type}
                      </p>
                      <span className="sm:hidden text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 sm:hidden">
                      Booked: {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Date & Time Section */}
                <div className="flex sm:contents w-full justify-between gap-5 items-center sm:w-auto mt-2 sm:mt-0 bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="flex flex-col sm:block">
                    <span className="text-xs text-gray-400 sm:hidden mb-1">
                      Date
                    </span>
                    <p className="text-gray-900 font-medium sm:text-gray-500 sm:font-normal">
                      {item.slotDate
                        ? item.slotDate.replace(/_/g, "/")
                        : item.slotDate}
                    </p>
                  </div>
                  <div className="flex flex-col sm:block text-right sm:text-left">
                    <span className="text-xs text-gray-400 sm:hidden mb-1">
                      Time
                    </span>
                    <p className="text-gray-900 font-medium sm:text-gray-500 sm:font-normal">
                      {item.slotTime}
                    </p>
                  </div>
                </div>

                <p className="max-sm:hidden">
                  {new Date(item.date).toLocaleDateString()}
                </p>

                {/* Price & Status Section */}
                <div className="flex items-center justify-between w-full sm:hidden mt-1">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 mb-1">Price</span>
                    <p className="font-semibold text-gray-900 text-lg">
                      ${item.serviceData.fee}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 mb-1">Status</span>
                    {item.cancelled ? (
                      <span className="px-3 py-1 rounded-full text-red-600 bg-red-50 text-xs font-semibold border border-red-100">
                        Cancelled
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-green-600 bg-green-50 text-xs font-semibold border border-green-100">
                        Confirmed
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop: Price & Status */}
                <p className="max-sm:hidden font-medium text-gray-900">
                  ${item.serviceData.fee}
                </p>
                <div className="flex max-sm:hidden">
                  {item.cancelled ? (
                    <span className="px-2.5 py-1 rounded-full text-red-600 bg-red-50 text-xs font-medium border border-red-100">
                      Cancelled
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-green-600 bg-green-50 text-xs font-medium border border-green-100">
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 h-full">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <CalendarX size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-900 font-medium text-lg">
                No appointments found
              </p>
              {selectedDate ? (
                <p className="text-gray-500 text-sm mt-2 max-w-xs text-center">
                  No appointments scheduled for{" "}
                  <span className="font-medium text-gray-900">
                    {format(selectedDate, "MMM do, yyyy")}
                  </span>
                </p>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  New appointments will appear here
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
