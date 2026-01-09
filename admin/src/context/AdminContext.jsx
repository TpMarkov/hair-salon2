import React, { createContext, useState } from 'react'

export const AdminContext = createContext()


const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : "")
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const value = {
    adminToken, setAdminToken, backendUrl,
    sideBarCollapsed, setSideBarCollapsed
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )

}

export default AdminContextProvider