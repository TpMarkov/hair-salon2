import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [latestServices, setLatestServices] = useState([])
  const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : false)
  const [userData, setUserData] = useState(false)


  const getAppointments = async () => {
    try {

      if (!token) {
        return setAppointments([])
      }

      const { data } = await axios.get(backendUrl + '/api/appointment/my-appointments', { headers: { token } })
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

  const getLatestServices = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/service/latest')
      if (data.success) {
        setLatestServices(data.services)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
      if (data.success) {
        setUserData(data.userData)
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
    getLatestServices()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
      getAppointments()
    } else {
      setUserData(false)
      setAppointments([])
    }
  }, [token])

  const logout = () => {
    setToken(false)
    setUserData(false)
    setAppointments([])
    sessionStorage.removeItem('token')
  }




  const value = {
    services,
    latestServices,
    backendUrl,
    appointments,
    getAppointments,
    getLatestServices,
    token, setToken,
    userData, setUserData,
    loadUserProfileData,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider