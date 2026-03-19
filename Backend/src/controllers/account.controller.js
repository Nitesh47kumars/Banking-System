import { accountModel } from "../models/account.model.js";
import { userModel } from "../models/user.model.js";
import { transactionModel } from "../models/transaction.model.js";
import { ledgerModel } from "../models/ledger.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const createAccountController = asyncHandler(async (req, res) => {
  const user = req.user;
  const WELCOME_BONUS = 1000;

  const existingAccount = await accountModel.findOne({ user: user._id });
  if (existingAccount) {
    throw new ApiError(409, "Account already exists for this user.");
  }

  const systemUser = await userModel.findOne({ systemUser: true });
  if (!systemUser) throw new ApiError(500, "System user not configured.");

  const systemAccount = await accountModel.findOne({ user: systemUser._id });
  if (!systemAccount) throw new ApiError(500, "System bank account not found.");

  const session = await mongoose.startSession();
  let newAccount = null;

  try {
    await session.withTransaction(async () => {
      newAccount = (
        await accountModel.create([{ user: user._id }], { session })
      )[0];

      const transaction = (
        await transactionModel.create(
          [
            {
              fromAccount: systemAccount._id,
              toAccount: newAccount._id,
              amount: WELCOME_BONUS,
              status: "PENDING",
              idempotencyKey: `welcome-bonus-${user._id}`,
            },
          ],
          { session }
        )
      )[0];

      await ledgerModel.create(
        [
          {
            account: systemAccount._id,
            amount: WELCOME_BONUS,
            transaction: transaction._id,
            type: "DEBIT",
          },
        ],
        { session }
      );

      await ledgerModel.create(
        [
          {
            account: newAccount._id,
            amount: WELCOME_BONUS,
            transaction: transaction._id,
            type: "CREDIT",
          },
        ],
        { session }
      );

      await transactionModel.findByIdAndUpdate(
        transaction._id,
        { status: "COMPLETED" },
        { session, new: true }
      );
    });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(500, "Account creation failed. Please try again.");
  } finally {
    await session.endSession();
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newAccount,
        "Account created! ₹1,000 welcome bonus credited."
      )
    );
});

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await accountModel.find({ user: req.user?._id });
  return res
    .status(200)
    .json(new ApiResponse(200, accounts, "Accounts Fetch Successfully."));
});

const getAccountBalance = asyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const account = await accountModel.findOne({
    _id: accountId,
  });

  if (!account) {
    throw new ApiError(404, "Account not Found!");
  }

  const balance = await account.getBalance();
  return res
    .status(200)
    .json(new ApiResponse(200, balance, "Balance Fetched Successfully"));
});

export { createAccountController, getAccounts, getAccountBalance };
