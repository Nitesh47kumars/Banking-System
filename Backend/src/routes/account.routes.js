import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createAccountController,
  getAllAccounts,
  getAccountBalance
} from "../controllers/account.controller.js";

const router = Router();

/**
 *  - POST /api/account/
 *  - Create a new account
 *  - Protected Route
 */

router.post("/", authMiddleware, createAccountController);

/**
 *  - POST /api/account/
 *  - GET All accounts of the logged-in user
 *  - Protected Route
 */
router.get("/", authMiddleware, getAllAccounts);

/**
 *  - GET /api/accounts/balance/:accountId
 */

router.get("/balance/:accountId", authMiddleware,  getAccountBalance);

export default router;
