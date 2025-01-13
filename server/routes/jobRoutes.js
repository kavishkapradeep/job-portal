import express from 'express'
import { getJobId, getJobs } from '../controllers/jobController.js'

const router = express.Router()
//Route get the all job data
router.get('/',getJobs)

//Route get a single job data
router.get('/:id',getJobId)
export default router