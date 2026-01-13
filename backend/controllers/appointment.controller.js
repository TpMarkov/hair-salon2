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

    const existingAppointments = await appointmentModel.find({ slotDate, cancelled: false })

    // Check for overlapping appointments (30-minute slots)
    const isSlotTaken = existingAppointments.some(appointment => appointment.slotTime === slotTime)

    if (isSlotTaken) {
      return res.json({ success: false, message: "This slot is already booked" })
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

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const userId = req.userId

    const appointment = await appointmentModel.findById(appointmentId)

    if (appointment.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // Emit Socket.IO event to notify admin dashboard
    io.emit('appointmentCancelled', {
      appointmentId,
      timestamp: Date.now()
    })

    res.json({ success: true, message: "Appointment Cancelled" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { createAppointment, getAllAppointments, userAppointments, cancelAppointment }
