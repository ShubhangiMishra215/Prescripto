import doctorModel from "../models/doctorModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModels.js";

const changeAvailability = async(req ,res)=>{
    try{

        const {docId} = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available : !docData.available})
        res.json({
            success:true,
            message:'Availability Changed'
        })

    }catch (error) {
    (console.log(error),
      res.json({
        success: false,
        message: error.message,
      }));
  }
}

const doctorList = async (req ,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({
            success:true,
            doctors
        })
    }catch (error) {
        (console.log(error),
        res.json({
            success: false,
            message: error.message,
        }));
    }

}

//API for doctor login
const loginDoctor = async(req ,res)=>{
    try{

        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({
                success:false,
                message:'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({
                success:true,
                token
            })
        }
        else{
            res.json({
                success:false,
                message:'Invalid credentials'
            })
        }

    }catch (error) {
        (console.log(error),
        res.json({
            success: false,
            message: error.message,
        }));
    }
}

//API to get doctor appointments for doctor panel
const appointmentDoctor = async (req, res) => {
    try {
        const docId = req.docId  
        console.log('docId:', docId)
        const appointments = await appointmentModel.find({docId})
        console.log('found:', appointments.length)
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to mark appointment complete for doctor panel
const appintmentComplete = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: 'Mark failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to cancel appointment for doctor panel
const appintmentCancelled = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })
        } else {
            return res.json({ success: false, message: 'Cancellation failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data for doctor panel
const doctorDashboard = async(req, res)=>{
    try{
        const{docId} = req
        const appointments = await appointmentModel.find({docId})
        let earnings = 0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount
            }
        })
        let patients = []

        appointments.map((item)=>{
            if(patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({
            success:true,
            dashData
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get doctor profile for doctor panel
const doctorProfile = async(req, res)=>{
    try{
        const {docId} = req
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({
            success:true,
            
            profileData
        })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update doctor profile from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req
        const { fees, about, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, about, address, available })

        res.json({
            success: true,
            message: 'Profile Updated'
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentDoctor, appintmentComplete, appintmentCancelled, doctorDashboard, doctorProfile, updateDoctorProfile}