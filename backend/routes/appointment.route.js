import express from "express";
import { createAppointment, getAllAppointments, userAppointments } from "../controllers/appointment.controller.js";
import authUser from "../middleware/authUser.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authUser, createAppointment);
appointmentRouter.get("/list", getAllAppointments);
appointmentRouter.get("/my-appointments", authUser, userAppointments);

export default appointmentRouter;
