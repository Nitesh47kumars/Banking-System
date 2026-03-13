import { Router } from "express";
import {
  userLoginController,
  userRegisterationController,
  userLogoutController,
  getUserData,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// POST /api/auth/register
router.post("/register", userRegisterationController);

// POST /api/auth/login
router.post("/login", userLoginController);

// POST /api/auth/logout
router.post("/logout", userLogoutController);

//GET /api/auth/getuserdata
router.get("/getuserdata", authMiddleware, getUserData);

export default router;
