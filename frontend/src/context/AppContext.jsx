import React, { createContext, useState, useEffect } from 'react'
import { services } from "../assets/assets.js";
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  const [appointments, setAppointments] = useState([])

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

  useEffect(() => {
    getAppointments()
  }, [])

  const value = {
    services,
    backendUrl,
    appointments,
    getAppointments
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider