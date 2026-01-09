import express from 'express';
import { loginAdmin } from "../controllers/admin.controller.js";

const adminRoute = express.Router()

adminRoute.post("/login", loginAdmin);

export default adminRoute;