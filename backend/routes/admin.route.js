import express from 'express';
import { loginAdmin } from "../controllers/admin.controller.js";
import { getAllAppointments } from '../controllers/appointment.controller.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRoute = express.Router()

adminRoute.post("/login", loginAdmin);
adminRoute.get("/all-appointments", authAdmin, getAllAppointments);

export default adminRoute;