const express = require("express");
const { body, check } = require("express-validator");

const characterRouter = express.Router();

const {
  createCharacterController,
  getAllCharactersController,
  updateCharacterController,
  getSingleCharacterController,
  deleteCharacterController,
} = require("../../controllers/character/characterController");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const isAdmin = require("../../middlewares/isAdmin");
const { upload } = require("../../utils/imageOperation");

characterRouter.get("/", isAuthenticated, getAllCharactersController);

characterRouter.post(
  "/create-character",
  upload.single("image"),
  [
    body("characterName")
      .trim()
      .notEmpty()
      .withMessage("Character name is required")
      .isAlphanumeric()
      .withMessage("Character name can only contain letters and numbers")
      .isLength({ min: 3 })
      .withMessage("Character name should be atleast 3 characters long"),
    body("strength")
      .trim()
      .notEmpty()
      .withMessage("Strength is required")
      .isNumeric()
      .withMessage("Strength must be a number"),
    body("health")
      .trim()
      .notEmpty()
      .withMessage("Health is required")
      .isNumeric()
      .withMessage("Health must be a number"),
    body("attack")
      .trim()
      .notEmpty()
      .withMessage("Attack is required")
      .isNumeric()
      .withMessage("Attack must be a number"),
    check("image").custom((value, { req }) => {
      if (!req.files?.image) {
        throw new Error("Character image is required");
      }
      return true;
    }),
  ],
  isAuthenticated,
  isAdmin,
  createCharacterController
);

characterRouter.put(
  "/update-character/:characterId",
  upload.single("image"),
  [
    body("characterName")
      .trim()
      .notEmpty()
      .withMessage("Character name is required")
      .isAlphanumeric()
      .withMessage("Character name can only contain letters and numbers")
      .isLength({ min: 3 })
      .withMessage("Character name should be atleast 3 characters long"),
    body("strength")
      .trim()
      .notEmpty()
      .withMessage("Strength is required")
      .isNumeric()
      .withMessage("Strength must be a number"),
    body("health")
      .trim()
      .notEmpty()
      .withMessage("Health is required")
      .isNumeric()
      .withMessage("Health must be a number"),
    body("attack")
      .trim()
      .notEmpty()
      .withMessage("Attack is required")
      .isNumeric()
      .withMessage("Attack must be a number"),
    check("image").custom((value, { req }) => {
      if (!req.body.image && !req.files?.image) {
        throw new Error("Character image is required");
      }
      return true;
    }),
  ],
  isAuthenticated,
  isAdmin,
  updateCharacterController
);

characterRouter.get(
  "/:characterId",
  isAuthenticated,
  getSingleCharacterController
);

characterRouter.delete(
  "/delete-character/:characterId",
  isAuthenticated,
  isAdmin,
  deleteCharacterController
);

module.exports = characterRouter;
