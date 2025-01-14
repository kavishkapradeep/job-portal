import * as Sentry from "@sentry/node";
import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db/db.js'
import "./db/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoute.js";
import connectCloudinary from "./db/cloudinary.js";
import jobsRoute from './routes/jobRoutes.js'
import userRoute from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

//Initialize express
const app= express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//connect database
await connectDb()
await connectCloudinary()
//route
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobsRoute)
app.use('/api/user',userRoute)

// PORT

const PORT =process.env.PORT ||5000;
Sentry.setupExpressErrorHandler(app); 

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
})