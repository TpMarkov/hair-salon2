import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { io } from 'socket.io-client'

export const AdminContext = createContext()


const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : "")
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Initialize Socket.IO connection
  useEffect(() => {
    const socketInstance = io(backendUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    socketInstance.on('connect', () => {
      console.log('Socket.IO connected:', socketInstance.id)
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Socket.IO disconnected')
      setIsConnected(false)
    })

    socketInstance.on('appointmentCreated', (data) => {
      console.log('New appointment received:', data)
      toast.info('New appointment created!')
      getAllAppointments() // Refresh appointments list
    })

    socketInstance.on('appointmentCancelled', (data) => {
      console.log('Appointment cancelled:', data)
      toast.info('Appointment cancelled by user!')
      getAllAppointments() // Refresh appointments list
    })

    setSocket(socketInstance)

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [backendUrl])

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/appointment/list`)
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // Services state and fetch function
  const [services, setServices] = useState([])

  const getAllServices = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/service/list')
      if (data.success) {
        setServices(data.services)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    adminToken, setAdminToken, backendUrl,
    sideBarCollapsed, setSideBarCollapsed,
    appointments, getAllAppointments,
    isConnected,
    services, getAllServices
  }

  return (
    <AdminContext.Provider value={value} >
      {props.children}
    </AdminContext.Provider >
  )

}

export default AdminContextProvider