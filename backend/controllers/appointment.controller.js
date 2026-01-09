import appointmentModel from "../models/appointment.model.js";

// API for create new appointment
const createAppointment = async (req, res) => {
  try {
    const { serviceData, slotDate, slotTime } = req.body

    if (!serviceData || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing Details" })
    }

    const appointmentData = {
      serviceData,
      slotDate,
      slotTime,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    res.json({ success: true, message: "Appointment Booked" })

  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

// API to get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

export { createAppointment, getAllAppointments }
