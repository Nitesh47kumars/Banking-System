import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { tokenBlacklistModel } from "../models/blacklist.model.js";

const authMiddleware = asyncHandler(async (req, _, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized Access! Token is missing");
  }

  const isBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isBlacklisted) {
    throw new ApiError(401, "Unauthorized Access, Token is Invalid!");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    throw new ApiError(401, "Unauthorized Access! Token is Invalid");
  }
});

const authSystemUserMiddleware = asyncHandler(async (req, _, next) => {
  const token = req.cookies.token || req.headers?.authorization.split(" ")[1];

  if (!token) {
    throw new ApiError(400, "Unauthorized! Token Not Found.");
  }

  const isBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isBlacklisted) {
    throw new ApiError(401, "Unauthorized Access, Token is Invalid!");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await userModel.findById(decoded._id).select("+systemuser");
    if (!user) {
      throw new ApiError(403, "Forbidden! Not a system User.");
    }

    req.user = user;

    return next();
  } catch (e) {
    console.log("Message:", e);
    throw new ApiError(500, "Something Went Wrong!");
  }
});

export { authMiddleware, authSystemUserMiddleware };
