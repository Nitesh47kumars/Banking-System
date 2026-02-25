import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is Required to Creating an Account."],
      trim: true,
      lowercase: true,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid Email Address",
      ],
      unique: [true, "Email Already Exist"],
    },
    name: {
      type: String,
      required: [true, "Name is Required to Create an Account."],
    },
    password: {
      type: String,
      required: [true, "Password is Required for Creating an Account."],
      minLength: [6, "Password should contain atleast 6 Character."],
      select: false,
    },
    systemUser:{
      type:Boolean,
      default:false,
      immutable: true,
      select: false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password"));

  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;

});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

export const userModel = mongoose.model("User", userSchema);
