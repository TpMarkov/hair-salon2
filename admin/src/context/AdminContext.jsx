import React, { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()


const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : "")
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
  const [appointments, setAppointments] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL

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


  const value = {
    adminToken, setAdminToken, backendUrl,
    sideBarCollapsed, setSideBarCollapsed,
    appointments, getAllAppointments
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )

}

export default AdminContextProvider