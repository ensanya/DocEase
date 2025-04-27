import validator from "validator";
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';



const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree) {
            return res.status(400).json({ success: false, message: "Missing Detail" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password of minimum length of 8 character" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            image: imageUrl
        });

        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "An error occurred while adding the doctor" });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credential" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

   const appointmentAdmin= async(req,res)=>{
        try{
            const appointments= await appointmentModel.find({})
            res.json({success:true,appointments})
        }
        catch (error) {
            toast.error(error.message);
    //         console.error("Error fetching appointments:", error);
    //  res.status(500).json({ success: false, message: error.message });

        }
    }
    const appointmentCancel=async(req,res)=>{
      try{
            
          const {appointmentId}= req.body
          const appointmentData= await appointmentModel.findById(appointmentId)
      
          await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      
          const {docId,slotDate,slotTime}= appointmentData
          const doctorData= await doctorModel.findById(docId)
          let slots_booked= doctorData.slots_booked
          slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime)
      
          await doctorModel.findByIdAndUpdate(docId,{slots_booked})
          res.json({success:true,message:'Appointment Cancelled'})
      
        }catch (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
    }      
    
    const adminDashboard= async(req,res)=>{
        try{
            const doctors= await doctorModel.find({})
            const users= await userModel.find({})
            const appointments= await appointmentModel.find({})
    
            const dashData= {
                doctors:doctors.length,
                appointments: appointments.length,
                patients: users.length,
                latestAppointments: appointments.reverse().slice(0,4)
    
            }
            res.json({success:true,dashData})
    
        }catch (error) {
          console.log(error);
          return res.json({ success: false, message: error.message });
        }
      }
export { addDoctor, loginAdmin, allDoctors,appointmentAdmin,appointmentCancel,adminDashboard };
