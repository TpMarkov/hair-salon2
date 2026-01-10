import serviceModel from "../models/service.model.js";
import { v2 as cloudinary } from "cloudinary"

// API for adding service
const addService = async (req, res) => {
    try {
        const { type, fee, shortDescription, description, filter } = req.body
        const imageFile = req.file

        if (!type || !fee || !shortDescription || !description || !filter) {
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

export { addService }
