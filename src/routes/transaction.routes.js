import { Router } from "express";
import {
  authMiddleware,
  authSystemUserMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  createInitialFundsTransaction,
} from "../controllers/transaction.controller.js";

const transactionRoutes = Router();

/**
 * - POST /api/transactions/
 * - Create a new Transaction
 */

transactionRoutes.post("/", authMiddleware, createTransaction);

/**
 * - POST /api/transactions/system/initial-funds
 * - Creating New Funds
 */

transactionRoutes.post(
  "/system/initial-funds",
  authSystemUserMiddleware,
  createInitialFundsTransaction
);

export default transactionRoutes;
