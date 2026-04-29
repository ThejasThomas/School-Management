import express,{Application} from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.routes"
import cookieParser from "cookie-parser";
const app:Application=express()
import studentRoutes from "./modules/student/student.routes"
import classRoutes from "./modules/class/class.routes"
console.log("FRONTEND_URI:", process.env.FRONTEND_URI);
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,              
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students",studentRoutes)
app.use("/classes", classRoutes);
  

export default app;
