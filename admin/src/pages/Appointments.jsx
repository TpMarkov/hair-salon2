import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { RefreshCw, Wifi, WifiOff, CalendarX } from 'lucide-react'
import { Calendar } from '../components/ui/calendar'
import { format } from 'date-fns'

const Appointments = () => {
    const { adminToken, appointments, getAllAppointments, isConnected } = useContext(AdminContext)
    const [lastRefresh, setLastRefresh] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedDate, setSelectedDate] = useState(undefined)
    const [filteredAppointments, setFilteredAppointments] = useState([])

    // Initial fetch when component mounts
    useEffect(() => {
        if (adminToken) {
            getAllAppointments()
            setLastRefresh(new Date())
        }
    }, [adminToken])

    useEffect(() => {
        if (appointments) {
            if (selectedDate) {
                // Try to match common formats. The 'slotDate' format from commonly used tutorials is "D_M_YYYY"
                const formattedDateUnderscore = format(selectedDate, 'd_M_yyyy')
                const formattedDateDash = format(selectedDate, 'd-M-yyyy')
                const formattedDateSlash = format(selectedDate, 'd/M/yyyy')

                const filtered = appointments.filter(item =>
                    item.slotDate === formattedDateUnderscore ||
                    item.slotDate === formattedDateDash ||
                    item.slotDate === formattedDateSlash
                )
                setFilteredAppointments(filtered)
            } else {
                setFilteredAppointments(appointments)
            }
        }
    }, [appointments, selectedDate])

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await getAllAppointments()
        setLastRefresh(new Date())
        setTimeout(() => setIsRefreshing(false), 500)
    }

    const clearDateFilter = () => {
        setSelectedDate(undefined)
    }

    return (
        <div className="w-full max-w-6xl m-5">
            <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-medium">All Appointments</p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                        <span>Refresh</span>
                    </button>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {isConnected ? (
                            <>
                                <Wifi size={14} className="text-green-500" />
                                <span className="text-green-600 font-medium">Live</span>
                            </>
                        ) : (
                            <>
                                <WifiOff size={14} className="text-red-500" />
                                <span className="text-red-600 font-medium">Offline</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendar Sidebar */}
                <div className="w-full lg:w-auto flex flex-col gap-4">
                    <div className="bg-white rounded-lg border p-4 shadow-sm">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md mx-auto"
                        />
                        {selectedDate && (
                            <button
                                onClick={clearDateFilter}
                                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-all cursor-pointer"
                            >
                                <CalendarX size={16} />
                                Clear Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Appointments List */}
                <div className="flex-1 bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                    <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700 sticky top-0">
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
                            <div className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-all" key={index}>
                                <p className="max-sm:hidden">{index + 1}</p>
                                <div className="flex items-center gap-2">
                                    <img className="w-8 rounded-full bg-gray-200 object-cover" src={item.serviceData.image} alt="" />
                                    <p className="font-medium text-gray-900">{item.serviceData.type}</p>
                                </div>
                                <p>{item.slotDate}</p>
                                <p>{item.slotTime}</p>
                                <p>{new Date(item.date).toLocaleDateString()}</p>
                                <p className="font-medium text-gray-900">${item.serviceData.fee}</p>
                                <div className="flex">
                                    {item.cancelled
                                        ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                        : <p className='text-green-500 text-xs font-medium'>Confirmed</p>
                                    }
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 h-full">
                            <p className="text-gray-400 text-lg">No appointments found</p>
                            {selectedDate && <p className="text-gray-400 text-sm mt-2">Try selecting a different date</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Appointments
