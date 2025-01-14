import jobApplication from "../models/JobApplication.js"
import job from '../models/Job.js'
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary'
//Get user Data
export const getUserData = async (req,res)=>{
    const {userId} = req.auth;

    try {
        const user = await User.findById(userId)
        if (!user) {
            res.json({success:false,message:"User not Found"})
        }
        res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//Apply for  A  job
export const applyForJob = async (req,res)=>{
    const {jobId} =req.body
    const userId = req.auth.userId
    try {
        const isAlreadyApplied =await jobApplication.find({userId,jobId})
        if (isAlreadyApplied.length>0) {
            return res.json({success:false,message:'User already Applied'})
        }
        const jobData =  await job.findById(jobId)

        if (!jobData) {
            return res.json({success:false ,message:'Job not found'})
        }
        await jobApplication.create({
            companyId:jobData.companyId,
            userId,
            jobId,
            date:Date.now()
        })
        res.json({success:true,message:"Job Apply success"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//Get user applied application
export const getUserAppliedApplication = async (req,res)=>{
    try {
        const userId =req.auth.userId
        const applications = await jobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if (!applications) {
            return res.json({success:false,message:"no job application for applied"})
        }
        return res.json({success:true,applications})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//update user profile (resume)
export const updateUserResume = async (req,res)=>{
    
    try {
        const userId = req.auth.userId
        const resumeFile =req.resumeFile
        const userData = await User.findById(userId)
        if (resumeFile) {
            const resumeUpload =await cloudinary.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url
        }
        await userData.save()
        return res.json({success:true,message:"Resume Updated"})    
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}