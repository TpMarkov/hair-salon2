import React from 'react'
import Login from "./pages/Login.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <div>
      <ToastContainer />
      <Login />
    </div>
  )
}
export default App
