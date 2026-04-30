import { Router } from "express";
import {
  addSubject,
  fetchSubjects,
  editSubject,
  removeSubject,
} from "./subject.controller";
import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";

const router = Router();

router.post("/",verifyAuth, addSubject);
router.get("/",verifyAuth, fetchSubjects);
router.put("/:id",verifyAuth, editSubject);
router.delete("/:id",verifyAuth, removeSubject);

export default router;