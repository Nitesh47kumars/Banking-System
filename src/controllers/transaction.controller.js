import emailService from "../services/email.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import accountModel from "../models/account.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createTransaction = asyncHandler(async (req, res) => {
  /**
   *  1.
   */

  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    throw new ApiError(
      400,
      "fromAccount, toAccount, Amount, IdempotencyKey , All are Required!"
    );
  }

  const fromUserAccount = await accountModel.findOne({ _id: fromAccount });

  const toUserAccount = await accountModel.findOne({ _id: toAccount });

  if (!fromUserAccount || !toUserAccount) {
    throw new ApiError(400, "Invalid fromUserAccount or toUserAccount!");
  }

  /**
   *  2. Validate idempotencyKey
   */

  const isTransactionAlreadyExist = transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionAlreadyExist) {
    if (isTransactionAlreadyExist.status === "COMPLETED") {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            isTransactionAlreadyExist,
            "Transaction already Processed."
          )
        );
    }
    if (isTransactionAlreadyExist.status === "PENDING") {
      throw new ApiError(200, "Transaction is Still Processing...");
    }
    if (isTransactionAlreadyExist.status === "FAILED") {
      throw new ApiError(
        500,
        "Transaction Processing Failed! Please Try Again"
      );
    }
    if (isTransactionAlreadyExist.status === "FAILED") {
      throw new ApiError(
        500,
        "Transaction Processing Reversed! Please Try Again"
      );
    }
  }

  /**
   *  3. Check Account Status
   */

  if (fromUserAccount.status !== "ACTIVE" || toUserAccount !== "ACTIVE") {
    throw new ApiError(
      400,
      "Both fromAccount and toAccount must be ACtive to process Transaction."
    );
  }
});
