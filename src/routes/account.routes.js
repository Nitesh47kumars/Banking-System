import { Router } from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { createAccountController } from "../controllers/account.controller.js";

const router = Router();

/**
 *  - POST /api/accounts/
 *  - Create a new account
 *  - Protected Route
 */

router.post("/", authMiddleware, createAccountController)

export default router;