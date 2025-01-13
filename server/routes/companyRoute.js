import express from 'express'
import { changeJobApplicationsStatus, getCompanyData, getCompanyJobApplication, getCompanyPostedJob, jobVisibility, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../db/multer.js'
import  {protectCompany}  from '../middlewares/authMiddleware.js'

const router = express.Router()

//Register Company 
router.post('/register',upload.single('image'),registerCompany)
router.post('/login',loginCompany)
router.get('/company',protectCompany,getCompanyData)

//job applications
router.post('/post-job',protectCompany,postJob)
router.get('/applicants',protectCompany,getCompanyJobApplication)
router.get('/list-jobs',protectCompany,getCompanyPostedJob)
router.post('/change-status',protectCompany,changeJobApplicationsStatus)
router.post('/change-visibility',protectCompany,jobVisibility)

export default router