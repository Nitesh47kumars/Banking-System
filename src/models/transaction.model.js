import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Account must be Associated with a From Account."],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Account must be Associated with a TO Account."],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Status can be either PENDING, COMPLETE, FAILED, REVERSED.",
      },
      default: "Pending",
    },
    amount: {
      type: Number,
      required: [true, "Amount cannot be Nagative."],
      min: [0, "Transaction Amount cannot be Negative."],
    },
    idempotencyKey: {
      type: String,
      required: [
        true,
        "Idempotency Key is required for Creating a Transaction.",
      ],
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);


export const transactionModel = mongoose.model("transaction", transactionSchema);