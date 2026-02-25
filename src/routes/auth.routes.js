import { Router } from "express";
import { userLoginController, userRegisterationController } from "../controllers/auth.controller.js";

const router  = Router();

// POST /api/auth/register
router.post("/register", userRegisterationController);


// POST /api/auth//login
router.post("/login", userLoginController)

export default router;