const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const User = require("../../models/User");
const Room = require("../../models/Room");

const appError = require("../../utils/appError");

const generateRoomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createRoomController = async (req, res, next) => {
  const { role, characterIds } = req.body;
  const userId = req.userAuth;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!["Attacker", "Defender"].includes(role)) {
    return next(appError("Invalid role", 400));
  }

  if (characterIds.length > 3) {
    return next(appError("You can select up to 3 characters only", 400));
  }

  try {
    const user = await User.findById(userId).populate("characters");

    if (!user) {
      return next(appError("User not found", 404));
    }

    const validCharacterIds = user.characters.map((char) =>
      char._id.toString()
    );
    const areCharactersValid = characterIds.every((id) =>
      validCharacterIds.includes(id)
    );

    if (!areCharactersValid) {
      return next(
        appError(
          "Some characters are invalid or do not belong to the user",
          400
        )
      );
    }

    const roomCode = generateRoomCode();

    const objectIdCharacterIds = characterIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    await Room.create({
      roomCode,
      players: [
        {
          userId,
          role,
          characters: objectIdCharacterIds,
        },
      ],
    });

    res.status(200).json({
      message: "Room created successfully",
      data: roomCode,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const joinRoomController = async (req, res, next) => {
  const { roomCode, characterIds } = req.body;
  const userId = req.userAuth;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (characterIds.length > 3) {
    return next(appError("You can select up to 3 characters only", 400));
  }

  try {
    const room = await Room.findOne({ roomCode, isActive: true });

    if (!room) {
      return next(appError("Room not found or already full", 404));
    }

    if (room.players.length >= 2) {
      return next(appError("Room is already full", 400));
    }

    const firstPlayerRole = room.players[0].role;
    const role = firstPlayerRole === "Attacker" ? "Defender" : "Attacker";

    const user = await User.findById(userId).populate("characters");

    if (!user) {
      return next(appError("User not found", 404));
    }

    const validCharacterIds = user.characters.map((char) =>
      char._id.toString()
    );
    const areCharactersValid = characterIds.every((id) =>
      validCharacterIds.includes(id)
    );

    if (!areCharactersValid) {
      return next(
        appError(
          "Some characters are invalid or do not belong to the user",
          400
        )
      );
    }

    const objectIdCharacterIds = characterIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    room.players.push({
      userId,
      role,
      characters: objectIdCharacterIds,
    });

    await room.save();

    res.status(200).json({
      message: "Joined room successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = { createRoomController, joinRoomController };
