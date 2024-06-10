const express = require("express");
const { body } = require("express-validator");

const roomRouter = express.Router();

const isAuthenticated = require("../../middlewares/isAuthenticated");

const {
  createRoomController,
  joinRoomController,
} = require("../../controllers/room/roomController");

roomRouter.post(
  "/create-room",
  [
    body("role").notEmpty().withMessage("Please choose a role"),
    body("characterIds")
      .isArray({ min: 1, max: 3 })
      .withMessage("Please choose at least one and at most three characters"),
  ],
  isAuthenticated,
  createRoomController
);

roomRouter.post(
  "/join-room",
  [
    body("roomCode").notEmpty().withMessage("Please enter a valid room code"),
    body("characterIds")
      .isArray({ min: 1, max: 3 })
      .withMessage("Please choose at least one and at most three characters"),
  ],
  isAuthenticated,
  joinRoomController
);

module.exports = roomRouter;
