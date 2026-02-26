import {sendTransactionSuccessEmail} from "../services/email.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {accountModel} from "../models/account.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { transactionModel } from "../models/transaction.model.js";
import mongoose from "mongoose";
import { ledgerModel } from "../models/ledger.model.js";

const createTransaction = asyncHandler(async (req, res) => {
  /**
   *  1. Validate Requiest
   */

  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    throw new ApiError(
      400,
      "fromAccount, toAccount, Amount and idempotency all are Required!"
    );
  }

  const fromUserAccount = await accountModel.findOne({ _id: fromAccount });
  const toUserAccount = await accountModel.findOne({ _id: toAccount });

  if (fromUserAccount !== "ACTIVE" || toUserAccount !== "ACTIVE") {
    throw new ApiError(
      400,
      "Both fromUserAccount and toUserAccount are Required!"
    );
  }

  /**
   *  2. Validate idempotencyKey
   */

  const isTransactionAlreadyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionAlreadyExist) {
    if (isTransactionAlreadyExist === "COMPELTED") {
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            isTransactionAlreadyExist,
            "Transaction Already Processed."
          )
        );
    }
    if (isTransactionAlreadyExist === "PENDING") {
      throw ApiError(401, "Transaction Already in Process...");
    }
    if (isTransactionAlreadyExist === "Failed") {
      throw new ApiError(
        500,
        "Transaction Processing Failed! Please Try Again"
      );
    }
    if (isTransactionAlreadyExist === "Reversed") {
      throw new ApiError(
        400,
        "Transaction Processing Reversed! Please Try Again"
      );
    }
  }

  /**
   *  3. Check Account Status
   */

  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    throw new ApiError(
      400,
      "Both fromAccount and toAccount must be ACtive to process Transaction."
    );
  }

  /**
   *  4. Drive Sender Balace from ledger
   */

  const balance = await fromUserAccount.getBalance();

  if (balance < amount) {
    throw new ApiError(
      400,
      `Insufficient Balance.Current balance is ${balance}, Requested amount is ${amount}`
    );
  }

  /**
   *  5.
   */

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const transaction = await transactionModel.create(
      {
        fromAccount,
        toAccount,
        status: "PENDING",
        amount,
        idempotencyKey,
      },
      { session }
    );

    const debitLedgerEntry = await ledgerModel.create(
      {
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT",
      },
      { session }
    );

    const creditLedgerEntry = await ledgerModel.create(
      {
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT",
      },
      { session }
    );

    transaction.status = "COMPLETED";

    await transaction.save({ session });
    await session.commitTransaction();

    await sendTransactionSuccessEmail(
      req.user.email,
      req.user.name,
      amount,
      toAccount
    );

    return res
      .status(201)
      .json(
        new ApiResponse(201, transaction, "Transaction Completed Successfully")
      );
  } catch (err) {
    console.log("Message:", err);
    await session.abortTransaction();
    throw new ApiError(500, "Transaction Failed, Something went Wrong!");
  } finally {
    session.endSession();
  }
});

export {createTransaction}