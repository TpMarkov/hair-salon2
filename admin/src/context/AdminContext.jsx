import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { io } from 'socket.io-client'

export const AdminContext = createContext()


const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : "")
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAllAppointments = useCallback(async () => {
    if (!backendUrl) return
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
  }, [backendUrl])

  // Initialize Socket.IO connection or Polling fallback
  useEffect(() => {
    if (!backendUrl) return

    const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')

    if (isProduction) {
      // In serverless/production (Vercel), we use Short Polling
      console.log('Socket.IO disabled in serverless environment - Switching to polling')
      setIsConnected(true) // Set to true to show "Live" status in UI via polling

      const intervalId = setInterval(() => {
        getAllAppointments()
        getAllServices()
      }, 30000) // Poll every 30 seconds

      return () => {
        clearInterval(intervalId)
        setIsConnected(false)
      }
    } else {
      // Only connect in local development
      const socketInstance = io(backendUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        timeout: 5000,
        autoConnect: true
      })


      socketInstance.on('connect', () => {
        console.log('Socket.IO connected:', socketInstance.id)
        setIsConnected(true)
      })

      socketInstance.on('disconnect', () => {
        console.log('Socket.IO disconnected')
        setIsConnected(false)
      })

      socketInstance.on('connect_error', () => {
        console.log('Socket.IO connection unavailable')
        socketInstance.disconnect()
        setIsConnected(false)
      })

      socketInstance.on('appointmentCreated', () => {
        console.log('New appointment received')
        toast.info('New appointment created!')
        getAllAppointments()
      })

      socketInstance.on('appointmentCancelled', () => {
        console.log('Appointment cancelled')
        toast.info('Appointment cancelled by user!')
        getAllAppointments()
      })

      // Cleanup on unmount
      return () => {
        if (socketInstance) {
          socketInstance.disconnect()
        }
        setIsConnected(false)
      }
    }
  }, [backendUrl, getAllAppointments])

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
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )

}

export default AdminContextProvider