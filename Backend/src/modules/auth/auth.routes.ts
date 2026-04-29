import { Router } from "express";
import { login, register } from "../auth/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;