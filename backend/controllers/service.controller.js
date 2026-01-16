import serviceModel from "../models/service.model.js";
import { v2 as cloudinary } from "cloudinary"

// API for adding service
const addService = async (req, res) => {
    try {
        const { type, fee, shortDescription, description, filter, duration } = req.body
        const imageFile = req.file

        if (!type || !fee || !shortDescription || !description || !filter || !duration) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Missing Image" })
        }

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        // Determine the next serviceId
        // Standard approach: Find max serviceId and add 1. 
        // Since it's a small app, this is fine. Ideally, use a counter collection or UUID.
        // However, the prompt showed hardcoded IDs 1-10.
        const lastService = await serviceModel.findOne().sort({ serviceId: -1 });
        const nextId = lastService && lastService.serviceId ? lastService.serviceId + 1 : 1;

        const serviceData = {
            serviceId: nextId,
            type,
            fee: Number(fee),
            shortDescription,
            description,
            duration: Number(duration),
            filter,
            image: imageUrl
        }

        const newService = new serviceModel(serviceData)
        await newService.save()

        res.json({ success: true, message: "Service Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for listing all services
const listServices = async (req, res) => {
    try {
        const services = await serviceModel.find({}).sort({ createdAt: -1 })
        res.json({ success: true, services })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for removing service
const removeService = async (req, res) => {
    try {
        const { id } = req.body
        const service = await serviceModel.findById(id)

        if (!service) {
            return res.json({ success: false, message: "Service not found" })
        }

        await serviceModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Service Deleted" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for updating service
const updateService = async (req, res) => {
    try {
        const { id, type, fee, shortDescription, description, duration, filter } = req.body

        if (!id) {
            return res.json({ success: false, message: "Service ID is required" })
        }

        const service = await serviceModel.findById(id)
        if (!service) {
            return res.json({ success: false, message: "Service not found" })
        }

        // Update fields if provided
        // We use || service.field to allow partial updates if needed, 
        // though the form usually sends everything.
        // Assuming the form sends the full correct data.
        const updatedData = {
            type: type || service.type,
            fee: fee ? Number(fee) : service.fee,
            shortDescription: shortDescription || service.shortDescription,
            description: description || service.description,
            duration: duration ? Number(duration) : service.duration,
            filter: filter || service.filter
        }

        await serviceModel.findByIdAndUpdate(id, updatedData)

        res.json({ success: true, message: "Service Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for fetching newest 3 services for ServicesMenu
const getLatestServices = async (req, res) => {
    try {
        const services = await serviceModel.find({}).sort({ createdAt: -1 }).limit(3)
        res.json({ success: true, services })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addService, listServices, removeService, updateService, getLatestServices }
