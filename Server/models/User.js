const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rewardPoint: {
    type: Number,
    default: 50,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  characters: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Character",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
