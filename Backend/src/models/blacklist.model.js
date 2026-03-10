import mongoose, { Schema } from "mongoose";

const tokenBlacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to Blacklist."],
      unique: [true, "Token is already Blacklisted."],
    },
  },
  { timestamps: true }
);

tokenBlacklistSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 3,
  }
);

export const tokenBlacklistModel = mongoose.model("TokenBlacklist", tokenBlacklistSchema);
