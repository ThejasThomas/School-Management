import { Router } from "express";
import {
  addStudent,
  fetchStudents,
  editStudent,
  removeStudent,
} from "./student.controller";
import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";
import { createStudentSchema, updateStudentSchema } from "./student.validation";
import { validate } from "../../middleware/validate.middleware";

const router = Router();

router.post(
  "/",
  verifyAuth,
  authorizeRoles("admin"),
  validate(createStudentSchema),
  addStudent,
);

router.get("/", verifyAuth, authorizeRoles("admin", "teacher"), fetchStudents);

router.put(
  "/:id",
  verifyAuth,
  authorizeRoles("admin"),
  validate(updateStudentSchema),
  editStudent,
);
router.delete("/:id", verifyAuth, authorizeRoles("admin"), removeStudent);

export default router;
