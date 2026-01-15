import express from 'express';
import { loginAdmin, adminDashboardStats } from "../controllers/admin.controller.js";
import { getAllAppointments } from '../controllers/appointment.controller.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRoute = express.Router()

adminRoute.post("/login", loginAdmin);
adminRoute.get("/all-appointments", authAdmin, getAllAppointments);
adminRoute.get("/dashboard-stats", authAdmin, adminDashboardStats);

export default adminRoute;