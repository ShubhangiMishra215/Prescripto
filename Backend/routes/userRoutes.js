import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppoointment, listAppointment, cancelAppointment, paymentRazorPay, verifyRazorPay } from '../controllers/userControllers.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.post('/book-appointment', authUser, bookAppoointment)
userRouter.get('/appointments',authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser,cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorPay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorPay)

export default userRouter