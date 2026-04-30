import { Router } from "express";

import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";
import { fetchAttendanceByDate, fetchAttendanceHistory, fetchDailyStats, fetchStudentsForTeacher, saveAttendance } from "./attendence.controller";
import { getDailyAttendanceStats } from "./attendence.service";

const router = Router();

router.get("/students", verifyAuth, authorizeRoles("teacher"), fetchStudentsForTeacher);

router.post("/", verifyAuth, authorizeRoles("teacher"), saveAttendance);

router.get("/history", verifyAuth, authorizeRoles("teacher"), fetchAttendanceHistory);
router.get("/by-date", verifyAuth, fetchAttendanceByDate);
router.get("/stats", verifyAuth, authorizeRoles("teacher"), fetchDailyStats);


export default router;