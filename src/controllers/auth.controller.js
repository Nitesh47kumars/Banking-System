import { userModel } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendRegisterationEmail } from "../services/email.service.js";

/**
 * - User Register Controller
 * - POST /api/auth/register
 */

const options = {
  httpOnly: true,
  secure: true,
};

const userRegisterationController = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const isExist = await userModel.findOne({ email: email });

  if (isExist) {
    throw new ApiError(422, "User Already Exist With This Email.");
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });

  const createdUser = await userModel.findById(user._id).select("-password");

  const token = await user.generateAccessToken();

  res.cookie("token", token, options);

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created Successfully."));

  await sendRegisterationEmail(createdUser.email, createdUser.name);
});

/**
 *  - User Login Controller
 *  - POST /api/auth/login
 */
const userLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid Credencials");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  const loginUser = user.toObject();

  delete loginUser.password;

  const token = await user.generateAccessToken();

  res.cookie("token", token, options);

  return res
    .status(200)
    .json(new ApiResponse(200, loginUser, "Login Successfully."));
});

export { userRegisterationController, userLoginController };
