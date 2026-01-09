import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { RefreshCw } from 'lucide-react'

const Appointments = () => {
    const { adminToken, appointments, getAllAppointments } = useContext(AdminContext)
    const [lastRefresh, setLastRefresh] = useState(new Date())
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Initial fetch when component mounts
    useEffect(() => {
        if (adminToken) {
            getAllAppointments()
            setLastRefresh(new Date())
        }
    }, [adminToken])

    // Listen for appointment creation events from frontend
    useEffect(() => {
        const handleStorageChange = (e) => {
            // Check if the event is for new appointment
            if (e.key === 'appointmentCreated' && e.newValue) {
                console.log('New appointment detected, refreshing...')
                handleRefresh()
            }
        }

        // Listen for storage events (cross-tab communication)
        window.addEventListener('storage', handleStorageChange)

        // Also listen for custom event in same tab
        const handleCustomEvent = () => {
            console.log('New appointment detected (same tab), refreshing...')
            handleRefresh()
        }
        window.addEventListener('appointmentCreated', handleCustomEvent)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('appointmentCreated', handleCustomEvent)
        }
    }, [])

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await getAllAppointments()
        setLastRefresh(new Date())
        setTimeout(() => setIsRefreshing(false), 500)
    }

    return (
        <div className="w-full max-w-6xl m-5">
            <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-medium">All Appointments</p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                        <span>Refresh</span>
                    </button>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-50 font-semibold text-gray-700">
                    <p>#</p>
                    <p>Service</p>
                    <p>Date</p>
                    <p>Time</p>
                    <p>Booking Date</p>
                    <p>Price</p>
                    <p>Action</p>
                </div>

                {appointments && appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-all" key={index}>
                            <p className="max-sm:hidden">{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img className="w-8 rounded-full bg-gray-200" src={item.serviceData.image} alt="" />
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
                    <div className="flex items-center justify-center py-10">
                        <p className="text-gray-400">No appointments found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Appointments
