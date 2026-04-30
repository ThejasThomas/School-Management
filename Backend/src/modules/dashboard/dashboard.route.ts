import { Router } from "express";
import { fetchDashboard } from "./dashboard.controller";
import { verifyAuth, authorizeRoles } from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  verifyAuth,
  authorizeRoles("admin"),
  fetchDashboard
);

export default router;