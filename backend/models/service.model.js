import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    type: { type: String, required: true },
    image: { type: String, required: true },
    fee: { type: Number, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    filter: { type: String, required: true },
}, { timestamps: true })

const serviceModel = mongoose.models.service || mongoose.model('service', serviceSchema)

export default serviceModel
