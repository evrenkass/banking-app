const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
