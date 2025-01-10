import * as Sentry from "@sentry/node";
import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db/db.js'
import "./db/instrument.js";

//Initialize express
const app= express()

//middlewares
app.use(cors())
app.use(express.json())

//connect database
await connectDb()
//route
app.get('/',(req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  

// PORT

const PORT =process.env.PORT ||5000;
Sentry.setupExpressErrorHandler(app); 

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
})