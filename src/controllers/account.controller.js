import { accountModel } from "../models/account.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createAccountController = asyncHandler( async (req, res)=>{
    const user = req.user;

    const account = await accountModel.create({user: user._id});

    res.status(201).json(new ApiResponse(201, account, "Account Created Successfully."));
});

export {createAccountController}