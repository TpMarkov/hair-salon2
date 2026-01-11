import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)


  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/appointment/list')
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const getServicesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/service/list')
      if (data.success) {
        setServices(data.services)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getServicesData()
    getAppointments()
  }, [])

  const value = {
    services,
    backendUrl,
    appointments,
    getAppointments,
    token, setToken
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider