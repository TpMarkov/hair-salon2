import express from 'express'
import { addService, listServices, removeService } from '../controllers/service.controller.js'
import upload from '../middleware/multer.js'
import authAdminMiddleware from '../middleware/authAdmin.js'

const serviceRouter = express.Router()

serviceRouter.post('/add-service', authAdminMiddleware, upload.single('image'), addService)
serviceRouter.get('/list', listServices)
serviceRouter.post('/remove', authAdminMiddleware, removeService)

export default serviceRouter
