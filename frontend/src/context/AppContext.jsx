import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
  const [latestServices, setLatestServices] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
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

  // Logout function to clear user session
  const logout = () => {
    setToken(false)
    setUserData(false)
    setAppointments([])
    localStorage.removeItem('token')
  }

  // Detect if running on mobile device or in WebView (Android APK)
  const isMobileOrWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
    const isWebView = /wv|webview/i.test(userAgent.toLowerCase())
    return isMobile || isWebView
  }

  // Enhanced auto-logout for mobile apps and browsers
  useEffect(() => {
    if (!token) return

    const mobile = isMobileOrWebView()

    // Handler for visibility change (primary for mobile/PWA/Android APK)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        logout()
      }
    }

    // Handler for page hide (fires when navigating away or closing)
    const handlePageHide = () => {
      logout()
    }

    // Handler for window blur (fires when window loses focus)
    const handleBlur = () => {
      if (mobile) {
        // On mobile, blur often means app is backgrounding
        logout()
      }
    }

    // Handler for beforeunload (desktop browsers)
    const handleBeforeUnload = () => {
      logout()
    }

    // Add all event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)

    if (mobile) {
      // For mobile devices, add blur listener for additional coverage
      window.addEventListener('blur', handleBlur)
    }

    // Always add beforeunload for desktop compatibility
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [token])


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