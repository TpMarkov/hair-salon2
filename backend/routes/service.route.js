import express from 'express'
import { addService } from '../controllers/service.controller.js'
import upload from '../middleware/multer.js'
import authAdminMiddleware from '../middleware/authAdmin.js'

const serviceRouter = express.Router()

serviceRouter.post('/add-service', authAdminMiddleware, upload.single('image'), addService)

export default serviceRouter
