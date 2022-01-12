const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
