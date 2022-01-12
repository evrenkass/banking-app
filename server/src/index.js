require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { firebaseAuthMiddleware } = require("./firebase");
const HttpError = require("./HttpError");
const asyncHandler = require("./asyncHandler");

const connectDb = require("./db");
const Profile = require("./ProfileSchema");
const Transaction = require("./TransactionSchema");

const app = express();

app.use(cors());
app.use(express.json());
app.use(firebaseAuthMiddleware());

app.get("/", () => {});

const getPublicProfileData = (profile) => ({
  name: profile.name,
  phoneNumber: profile.phoneNumber,
  accountNumber: profile.accountNumber,
});

app.post(
  "/profile",
  asyncHandler(async (req, res) => {
    const prevProfile = await Profile.findOne({ userId: req.user.uid });
    if (prevProfile) {
      throw new HttpError("Profile already exists", 400);
    }

    const accountNumber = Math.random().toFixed(9).split(".")[1];

    const profile = new Profile({
      userId: req.user.uid,
      name: req.body.name,
      accountNumber,
    });

    await profile.save();
    res.json({
      ok: true,
      data: getPublicProfileData(profile),
    });
  })
);

app.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ userId: req.user.uid });

    if (!profile) {
      throw new HttpError("Profile not found");
    }

    if (!req.body.name) {
      throw new HttpError("Name cannot be empty");
    }

    profile.phoneNumber = req.body.phoneNumber;
    profile.name = req.body.name;

    await profile.save();

    res.json({
      ok: true,
      data: getPublicProfileData(profile),
    });
  })
);

app.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ userId: req.user.uid });
    res.json({
      ok: true,
      data: getPublicProfileData(profile),
    });
  })
);

app.get(
  "/profiles",
  asyncHandler(async (req, res) => {
    const profiles = await Profile.find({ userId: { $ne: req.user.uid } });

    res.json({
      ok: true,
      data: profiles.map((profile) => getPublicProfileData(profile)),
    });
  })
);

app.get(
  "/transactions",
  asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user.uid });

    res.json({
      ok: true,
      data: transactions.map(({ id, amount, note, date }) => ({
        id,
        amount,
        note,
        date,
      })),
    });
  })
);

app.post(
  "/transactions",
  asyncHandler(async (req, res) => {
    const amount = parseFloat(req.body.amount);

    const transaction = new Transaction({
      userId: req.user.uid,
      amount,
      note: req.body.note,
      date: Date.now(),
    });

    const allTransactions = await Transaction.find({ userId: req.user.uid });
    const total = allTransactions.reduce(
      (acc, prev) => acc + Number(prev.amount),
      0
    );

    if (amount < 0 && Math.abs(amount) > total) {
      throw new HttpError("Cannot withdraw. Insufficient funds");
    }

    await transaction.save();

    res.json({
      ok: true,
      data: {
        total: total + amount,
      },
    });
  })
);

app.post(
  "/transfer",
  asyncHandler(async (req, res) => {
    const amount = parseFloat(req.body.amount);

    if (amount < 0) {
      throw new Error("Transfer amount cannot be less than ZERO");
    }

    const sender = await Profile.findOne({
      userId: req.user.uid,
    });

    if (!sender) {
      throw new HttpError("Unknown error");
    }

    const recipient = await Profile.findOne({
      accountNumber: req.body.recipient,
    });

    if (!recipient) {
      throw new HttpError("Recipient does not exist");
    }

    const allTransactions = await Transaction.find({ userId: req.user.uid });
    const total = allTransactions.reduce(
      (acc, prev) => acc + Number(prev.amount),
      0
    );

    if (amount > total) {
      throw new HttpError("Cannot transfer. Insufficient funds");
    }

    const withdraw = new Transaction({
      userId: req.user.uid,
      amount: -amount,
      note: `${req.body.note} (To: ${recipient.name})`,
      date: new Date(),
    });
    await withdraw.save();

    const deposit = new Transaction({
      userId: recipient.userId,
      amount: amount,
      note: `${req.body.note} (From: ${sender.name})`,
      date: new Date(),
    });
    await deposit.save();

    res.json({
      ok: true,
      data: {
        total: total - amount,
      },
    });
  })
);

app.use(function (err, req, res, next) {
  if (!err) next();

  res.statusCode = err.name === "HttpError" ? err.status : 500;

  res.json({
    ok: false,
    error: err.message,
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000!");
  connectDb().then(() => {
    console.log("MongodB connected");
  });
});
