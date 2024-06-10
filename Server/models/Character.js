const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    characterName: {
      type: String,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
    strength: {
      type: Number,
      required: true,
    },
    attack: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
