const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  players: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Attacker", "Defender"],
        required: true,
      },
      characters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Character",
          required: true,
        },
      ],
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
