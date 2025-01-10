import mongoose from "mongoose"


const connectDb = async ()=>{
  mongoose.connection.on("connected",()=>console.log("Database Connected")
  )
  await mongoose.connect(`${process.env.MOGODB_URL}/job-portal`)
  
}

export default connectDb