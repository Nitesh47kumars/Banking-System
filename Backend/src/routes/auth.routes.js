import { Router } from "express";
import {
  userLoginController,
  userRegisterationController,
  userLogoutController,
} from "../controllers/auth.controller.js";

const router = Router();

// POST /api/auth/register
router.post("/register", userRegisterationController);

// POST /api/auth/login
router.post("/login", userLoginController);

// POST /api/auth/logout
router.post("/logout", userLogoutController);

export default router;
