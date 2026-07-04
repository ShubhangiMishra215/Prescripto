# Prescripto

Prescripto is a full-stack MERN doctor appointment booking platform with separate patient, doctor, and admin panels for browsing doctors, booking appointments, and managing schedules online.

## Table of contents

- [Overview](#overview)
  - [The Project](#the-project)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Deployment](#deployment)
- [Author](#author)

## Overview

### The Project

Users should be able to:

- Register and log in as a patient
- Browse doctors by specialization and view their profiles
- Book, reschedule, and cancel appointments
- Pay for appointments online via Razorpay
- View their appointment history from their profile

Doctors should be able to:

- Log in to a dedicated dashboard
- View upcoming appointments and earnings
- Mark appointments as completed or cancelled

Admins should be able to:

- Log in with admin credentials
- Add and manage doctor profiles
- View and manage all appointments across the platform

### Links

- Live Site URL: [Frontend link](https://prescripto-woad-rho.vercel.app)
- Admin Panel URL: [Admin link](https://prescripto-5yay.vercel.app)
- Backend Repo / API: [Backend link](https://prescripto-bv3p.onrender.com)

## My process

### Built with

- React.js
- React Router
- Context API
- Tailwind CSS
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT authentication
- Razorpay API
- Cloudinary

### What I learned

Building the admin and doctor dashboards alongside the patient-facing app pushed me to think carefully about role-based access and keeping the same data (appointments, doctors) in sync across three separate frontends talking to one backend.

Handling payments with Razorpay meant learning how to verify payment signatures securely on the backend rather than trusting the frontend response:

```js
const isAuthentic = validateWebhookSignature(
  razorpayOrderId,
  razorpaySignature,
  process.env.RAZORPAY_KEY_SECRET
);
```

I also got a lot more comfortable debugging mismatches between frontend and backend field names (like `docId` vs `doctorId`) and using middleware to attach `req.userId` rather than trusting values sent in the request body.

### Continued development

Things I'd like to keep improving:

- Add automated tests for booking and payment flows
- Add email/SMS reminders for upcoming appointments
- Improve mobile responsiveness across all three panels
- Add doctor ratings and reviews

### Useful resources

- [MongoDB Mongoose Docs](https://mongoosejs.com/docs/guide.html) - Helped a lot with schema design and validation.
- [Razorpay Integration Guide](https://razorpay.com/docs/) - Used this to set up and verify payments correctly.

## Deployment

This project is deployed across three separate services:

| App | Platform | Root Directory |
|-----|----------|-----------------|
| Backend | Render | `backend` |
| Frontend | Vercel | `frontend` |
| Admin Panel | Vercel | `admin` |

## Author

- GitHub - [@ShubhangiMishra215](https://github.com/ShubhangiMishra215)
