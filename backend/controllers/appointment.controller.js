import appointmentModel from "../models/appointment.model.js";
import { io } from "../server.js";

// API for create new appointment
const createAppointment = async (req, res) => {
  try {
    const { serviceData, slotDate, slotTime } = req.body
    const userId = req.userId

    if (!serviceData || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing Details" })
    }

    const appointmentData = {
      userId,
      serviceData,
      slotDate,
      slotTime,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // Emit Socket.IO event to notify admin dashboard
    io.emit('appointmentCreated', {
      appointment: newAppointment,
      timestamp: Date.now()
    })
    console.log('Socket.IO event emitted: appointmentCreated')

    res.json({ success: true, message: "Appointment Booked" })

  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

// API to get all appointments (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

// API to get user appointments
const userAppointments = async (req, res) => {
  try {
    const userId = req.userId
    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

export { createAppointment, getAllAppointments, userAppointments }
