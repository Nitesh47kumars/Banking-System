import mongoose, { Schema } from "mongoose";
import ApiError from "../utils/ApiError";

const ledgerSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Ledger must be associated with an Account."],
      index: true,
      immutable: true,
    },
    amount: {
      type: Numbar,
      required: [true, "Amount is required for Creating a Ledger Entry."],
      immutable: true,
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "transaction",
      required: [true, "Ledger must be Associated with a Transaction."],
      index: true,
      immutable: true,
    },
    type: {
      type: String,
      enum: {
        values: ["CREDIT", "DEBIT"],
        message: "Type can be Either CREDIT OR DEBIT.",
      },
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

function preventLedgerModification(next) {
  throw new ApiError(
    500,
    "Ledger Entries are immutable and cannot be modified or deleted!"
  );
}

[
  "findOneAndDelete",
  "findOneAndReplace",
  "findOneAndUpdate",
  "deleteMany",
  "deleteOne",
  "remove",
  "updateMany",
  "updateOne",
  "findByIdAndUpdate",
  "findByIdAndDelete",
].forEach((hook) => {
  ledgerSchema.pre(hook, preventLedgerModification);
});

export const ledgerModel = mongoose.model("ledger", ledgerSchema);
