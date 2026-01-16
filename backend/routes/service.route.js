import express from 'express'
import { addService, listServices, removeService, updateService, getLatestServices } from '../controllers/service.controller.js'
import upload from '../middleware/multer.js'
import authAdminMiddleware from '../middleware/authAdmin.js'

const serviceRouter = express.Router()

serviceRouter.post('/add-service', authAdminMiddleware, upload.single('image'), addService)
serviceRouter.get('/list', listServices)
serviceRouter.get('/latest', getLatestServices)
serviceRouter.post('/remove', authAdminMiddleware, removeService)
serviceRouter.post('/update', authAdminMiddleware, updateService)

export default serviceRouter
