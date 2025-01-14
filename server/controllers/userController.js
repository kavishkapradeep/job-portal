import User from "../models/User.js"
//Get user Data
export const getUserData = async (req,res)=>{
    const {userId} = req.auth.userId

    try {
        const user = User.findById(userId)
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

}
//Get user applied application
export const getUserAppliedApplication = async (req,res)=>{

}
//update user profile (resume)
export const updateUserResume = async (req,res)=>{
    
}