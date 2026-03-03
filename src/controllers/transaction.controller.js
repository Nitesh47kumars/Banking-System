import { sendTransactionSuccessEmail } from "../services/email.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { accountModel } from "../models/account.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { transactionModel } from "../models/transaction.model.js";
import mongoose, { mongo } from "mongoose";
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

  if (!fromUserAccount || !toUserAccount) {
    throw new ApiError(400, "Invalid fromAccount and toAccount!");
  }

  /**
   *  2. Validate idempotencyKey
   */

  const isTransactionAlreadyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionAlreadyExist) {
    if (isTransactionAlreadyExist.status === "COMPLETED") {
      return res
        .status(200)
        .json(
          new ApiResponse(
            201,
            isTransactionAlreadyExist,
            "Transaction Already Processed."
          )
        );
    }
    if (isTransactionAlreadyExist.status === "PENDING") {
      throw new ApiError(401, "Transaction Already in Process...");
    }
    if (isTransactionAlreadyExist.status === "Failed") {
      throw new ApiError(
        500,
        "Transaction Processing Failed! Please Try Again"
      );
    }
    if (isTransactionAlreadyExist.status === "Reversed") {
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

  let transaction;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    transaction = (
      await transactionModel.create(
        [
          {
            fromAccount,
            toAccount,
            amount,
            status: "PENDING",
            idempotencyKey,
          },
        ],
        { session }
      )
    )[0];

    const debitLedgerEntry = await ledgerModel.create(
      [
        {
          account: fromAccount,
          amount: amount,
          transaction: transaction._id,
          type: "DEBIT",
        },
      ],
      { session }
    );

    await (() => {
      return new Promise((resolve) => setTimeout(resolve, 10 * 1000));
    })();

    const creditLedgerEntry = await ledgerModel.create(
      [
        {
          account: toAccount,
          amount: amount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session }
    );

    await transactionModel.findByIdAndUpdate(
      { _id: transaction._id },
      { status: "COMPLETED" },
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (e) {
    throw new ApiError(400, "Transaction is PENDING due to Some Issue");
  }

  await sendTransactionSuccessEmail(
    req.user.email,
    req.user.name,
    amount,
    toAccount
  );

  return res
    .status(201)
    .json(new ApiResponse(201, transaction, "Transaction Successful."));
});

const createInitialFundsTransaction = asyncHandler(async (req, res) => {
  const { toAccount, amount, idempotencyKey } = req.body;

  if (!toAccount || !amount || !idempotencyKey) {
    throw new ApiError(
      400,
      "toAccount, amount, idempotencyKey All is Required!"
    );
  }

  const toUserAccount = await accountModel.findOne({ _id: toAccount });

  console.log(toUserAccount);

  if (!toUserAccount) {
    throw new ApiError(400, "Invalid Credential, User Not Found!");
  }

  if (toUserAccount.status !== "ACTIVE") {
    throw new ApiError(400, "toUserAccount is not ACTIVE!");
  }

  const fromUserAccount = await accountModel.findOne({
    user: req.user._id,
  });

  if (!fromUserAccount) {
    throw new ApiError(400, "SystemUser Account not Found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = new transactionModel({
    fromAccount: fromUserAccount._id,
    toAccount,
    status: "PENDING",
    amount,
    idempotencyKey,
  });

  const debitLedgerEntry = await ledgerModel.create(
    [
      {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT",
      },
    ],
    { session }
  );

  const creditLedgerEntry = await ledgerModel.create(
    [
      {
        account: toUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT",
      },
    ],
    { session }
  );

  transaction.status = "COMPLETED";
  await transaction.save({ session });

  await session.commitTransaction();
  session.endSession();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        transaction,
        "Initial Funds Transaction Completed Successfully"
      )
    );
});

export { createTransaction, createInitialFundsTransaction };
