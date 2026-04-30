import { Router } from "express";
import {
  fetchTeachers,
  editTeacher,
  changeTeacherStatus,
  removeTeacher,
} from "./teacher.controller";

import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", verifyAuth, authorizeRoles("admin"), fetchTeachers);

router.put("/:id", verifyAuth, authorizeRoles("admin"), editTeacher);

router.patch(
  "/:id/status",
  verifyAuth,
  authorizeRoles("admin"),
  changeTeacherStatus,
);

router.delete("/:id", verifyAuth, authorizeRoles("admin"), removeTeacher);

export default router;
