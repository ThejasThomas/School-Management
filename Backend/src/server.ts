import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import app from "./app";




const PORT =process.env.PORT || 5000;

const startServer =async ()=>{
    try{

        if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined in .env");

        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");

        app.listen(PORT,()=>{
            console.log(`server running on http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.error(error);
        

    }
}

startServer()