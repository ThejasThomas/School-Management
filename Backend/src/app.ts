import express,{Application} from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.routes"
import cookieParser from "cookie-parser";
const app:Application=express()
import studentRoutes from "./modules/student/student.routes"
import classRoutes from "./modules/class/class.routes"
import teacherRoutes from "./modules/teacher/teacher.routes"
import subjectRoutes from "./modules/subject/subject.routes"
import attendanceRoutes from "./modules/attendence/attendence.routes"
import dashboardRoutes from "./modules/dashboard/dashboard.route"
import { errorHandler } from "./middleware/error.middleware";

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
app.use("/teachers", teacherRoutes);
app.use("/subjects", subjectRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/admin/dashboard", dashboardRoutes);
  
app.use(errorHandler);


export default app;
