import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

const Appointments = () => {
    const { adminToken, appointments, getAllAppointments } = useContext(AdminContext)

    useEffect(() => {
        if (adminToken) {
            getAllAppointments()
        }
    }, [adminToken])

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>

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
