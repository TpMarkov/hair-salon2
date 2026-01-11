import express from "express";
import { createAppointment, getAllAppointments, userAppointments, cancelAppointment } from "../controllers/appointment.controller.js";
import authUser from "../middleware/authUser.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authUser, createAppointment);
appointmentRouter.get("/list", getAllAppointments);
appointmentRouter.get("/my-appointments", authUser, userAppointments);
appointmentRouter.post("/cancel", authUser, cancelAppointment);

export default appointmentRouter;
