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

  // Initialize Socket.IO connection (only works in local development, not serverless)
  useEffect(() => {
    if (!backendUrl) return

    // Check if we're in production/serverless environment
    const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')

    if (isProduction) {
      // In serverless/production, Socket.IO doesn't work - skip connection silently
      console.log('Socket.IO disabled in serverless environment')
      return
    }


    // TODO: Find a way to update appointments withoud using sockets or use sockets for production
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
      // Suppress error messages in production/serverless
      console.log('Socket.IO connection unavailable (expected in serverless)')
      socketInstance.disconnect()
      setIsConnected(false)
    })

    socketInstance.on('appointmentCreated', () => {
      console.log('New appointment received')
      toast.info('New appointment created!')
      getAllAppointments() // Refresh appointments list
    })

    socketInstance.on('appointmentCancelled', () => {
      console.log('Appointment cancelled')
      toast.info('Appointment cancelled by user!')
      getAllAppointments() // Refresh appointments list
    })

    // Cleanup on unmount
    return () => {
      if (socketInstance && socketInstance.connected) {
        socketInstance.disconnect()
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