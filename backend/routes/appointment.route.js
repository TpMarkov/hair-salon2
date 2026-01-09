import express from "express";
import { createAppointment, getAllAppointments } from "../controllers/appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", createAppointment);
appointmentRouter.get("/list", getAllAppointments);

export default appointmentRouter;
