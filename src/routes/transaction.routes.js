import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const transactionRoutes = Router();

/**
 * - POST /api/transactions/
 * - Create a new Transaction
 */

transactionRoutes.post("/",authMiddleware)

export default transactionRoutes;