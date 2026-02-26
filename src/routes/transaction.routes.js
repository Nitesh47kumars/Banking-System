import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createTransaction } from "../controllers/transaction.controller.js";

const transactionRoutes = Router();

/**
 * - POST /api/transactions/
 * - Create a new Transaction
 */

transactionRoutes.post("/", authMiddleware, createTransaction);

export default transactionRoutes;
