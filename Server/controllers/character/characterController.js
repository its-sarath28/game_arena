const { validationResult } = require("express-validator");

const Character = require("../../models/Character");

const appError = require("../../utils/appError");
const {
  uploadToFirebase,
  deleteFromFirebase,
} = require("../../utils/imageOperation");

const getAllCharactersController = async (req, res, next) => {
  try {
    const allCharacters = await Character.find({}).sort({ name: 1 });

    res.status(200).json({
      message: "All characters",
      data: allCharacters,
    });
  } catch (err) {}
};

const createCharacterController = async (req, res, next) => {
  const { characterName, health, strength, attack } = req.body;

  const errors = validationResult(req);

  let formattedErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(500).json({ errors: formattedErrors });
  }

  try {
    let imageURL = "";

    if (req.file) {
      imageURL = await uploadToFirebase(req.file);
    }

    const newCharacterName = characterName.toLowerCase();

    const characterFound = await Character.findOne({
      characterName: newCharacterName,
    });

    if (characterFound) {
      formattedErrors.characterName = "Character name already exists";
      return res.status(409).json({ errors: formattedErrors });
    }

    const newCharacter = await Character.create({
      characterName,
      strength,
      attack,
      health,
      imageURL,
    });

    if (!newCharacter) {
      return next(appError("Error in creating new character", 500));
    }

    res.status(200).json({
      message: "Character created successfully",
    });
  } catch (err) {
    next(appError(err));
  }
};

const getSingleCharacterController = async (req, res, next) => {
  const characterId = req.params.characterId;

  try {
    const singleCharacter = await Character.findById(characterId);

    if (!singleCharacter) {
      return next(appError("Character not found", 404));
    }

    res.status(200).json({
      message: "Single character",
      data: singleCharacter,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const updateCharacterController = async (req, res, next) => {
  const { characterName, health, strength, attack } = req.body;

  const errors = validationResult(req);

  let formattedErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(500).json({ errors: formattedErrors });
  }

  try {
    const characterToUpdate = await Character.findById(req.params.characterId);

    if (!characterToUpdate) {
      return next(appError("Character not found", 404));
    }

    let imageURL = characterToUpdate.imageURL;

    // If a new file is uploaded
    if (req.file) {
      // Delete the old file from Firebase
      if (imageURL) {
        await deleteFromFirebase(imageURL);
      }

      // Upload the new file to Firebase
      imageURL = await uploadToFirebase(req.file);
    }

    await Character.findByIdAndUpdate(
      req.params.characterId,
      {
        characterName,
        strength,
        attack,
        health,
        imageURL,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Character updated successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const deleteCharacterController = async (req, res, next) => {
  const characterId = req.params.characterId;

  try {
    const characterToDelete = await Character.findById(characterId);

    if (!characterToDelete) {
      return next(appError("Character not found", 404));
    }

    let imageURL = characterToDelete.imageURL;

    if (imageURL) {
      await deleteFromFirebase(imageURL);
    }

    await Character.findByIdAndDelete(characterId);

    res.status(200).json({
      message: "Character deleted successfully",
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  getAllCharactersController,
  createCharacterController,
  getSingleCharacterController,
  updateCharacterController,
  deleteCharacterController,
};
