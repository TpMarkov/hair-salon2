import validator from "validator"
import bcrypt from "bcrypt"
import {userModel} from "../models/user.model.js";
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from 'cloudinary'
import connectDB from "../config/mongodb.js";

//  Register user
const registerUser = async (req, res) => {
  await connectDB();
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.json({success: false, message: "Всички полета са задължителни"})
    }

    // Check if user already exists
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success: false, message: "Потребител с този имейл вече съществува"});
    }

    //  Validating email address
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Моля въведете валиден е-адрес"})
    }

    //  Validate strong password
    if (password.length < 8) {
      return res.json({success: false, message: "Паролата трябва да е поне 8 символа"})
    }

    //  Hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    // create token using the _id
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.json({success: true, token})

  } catch (err) {
    console.log(err)
    return res.json({success: false, message: err.message})
  }
}

const loginUser = async (req, res) => {
  await connectDB();

  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.json({success: false, message: "Всички полета са задължителни"})
    }

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success: false, message: "Невалидни входни данни"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      res.json({success: true, token})
    } else {
      return res.json({success: false, message: "Грешна парола"})
    }

  } catch (err) {
    console.log(err)
    return res.json({success: false, message: err.message})
  }

}

const getProfile = async (req, res) => {
  await connectDB();
  try {
    const userId = req.userId
    const userData = await userModel.findById(userId).select('-password')
    res.json({success: true, userData})

  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

const updateProfile = async (req, res) => {
  await connectDB();
  try {
    const {name, phone} = req.body
    const userId = req.userId

    const updateData = {name, phone}

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {resource_type: 'image'})
      updateData.image = imageUpload.secure_url
    }

    await userModel.findByIdAndUpdate(userId, updateData)
    res.json({success: true, message: "Профилът е обновен успешно"})

  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
}