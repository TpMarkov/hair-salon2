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

    // Helper to convert "HH:mm" to minutes from midnight
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const newApptStart = timeToMinutes(slotTime);
    const newApptDuration = serviceData.duration || 30; // Default to 30 if missing (legacy)
    const newApptEnd = newApptStart + newApptDuration;

    // Check for overlapping appointments
    const isSlotTaken = existingAppointments.some(appointment => {
      const existingStart = timeToMinutes(appointment.slotTime);
      const existingDuration = appointment.serviceData.duration || 30;
      const existingEnd = existingStart + existingDuration;

      // Check overlap: (StartA < EndB) and (EndA > StartB)
      return (newApptStart < existingEnd && newApptEnd > existingStart);
    });

    if (isSlotTaken) {
      return res.json({ success: false, message: "This time slot is unavailable due to an overlap." })
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
