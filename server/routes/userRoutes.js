import express from 'express'
import { applyForJob, getUserAppliedApplication, getUserData, updateUserResume } from '../controllers/userController.js'
import upload from '../db/multer.js'

const router =express.Router()

router.get('/user',getUserData)
router.post('/apply',applyForJob)
router.post('/applications',getUserAppliedApplication)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router