import { accountModel } from "../models/account.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createAccountController = asyncHandler(async (req, res) => {
  const user = req.user;

  const account = await accountModel.create({ user: user._id });

  res
    .status(201)
    .json(new ApiResponse(201, account, "Account Created Successfully."));
});

const getAllAccounts = asyncHandler(async (req, res) => {
  const accounts = await accountModel.find();
  return res
    .status(200)
    .json(new ApiResponse(200, accounts, "All Accounts Fetch Successfully."));
});

const getAccountBalance = asyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const account = await accountModel.findOne({
    _id: accountId,
    user: req.user._id,
  });

  if (!account) {
    throw new ApiError(404, "Account not Found!");
  }

  const balance = await account.getBalance();
  console.log(balance)
  return res
    .status(200)
    .json(new ApiResponse(200, {balance}, "Balance Fetched Successfully"));
});

export { createAccountController, getAllAccounts, getAccountBalance };
