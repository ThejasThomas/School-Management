import { Router } from "express";
import { addClass } from "./class.controller";
import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", addClass);

export default router;