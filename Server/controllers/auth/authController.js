const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../../models/User");
const Character = require("../../models/Character");

const generateToken = require("../../utils/generateToken");
const appError = require("../../utils/appError");

const signUpController = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const errors = validationResult(req);

  let formattedErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(500).json({ errors: formattedErrors });
  }

  try {
    const newEmail = email.toLowerCase();
    const newUsername = username.toLowerCase();

    const userFound = await User.findOne({ email: newEmail });

    if (userFound) {
      formattedErrors.email = "Email already exists";
      return res.status(409).json({ errors: formattedErrors });
    }

    const usernameFound = await User.findOne({ username: newUsername });

    if (usernameFound) {
      formattedErrors.username = "This username is unavailable";
      return res.status(409).json({ errors: formattedErrors });
    }

    // Find the Gornak character
    const initialCharacter = await Character.findOne({
      characterName: "Gornak",
    });

    if (!initialCharacter) {
      // Handle case if Gornak character doesn't exist
      return next(appError("Gornak character not found", 404));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username: newUsername,
      email: newEmail,
      password: hashedPassword,
      characters: [initialCharacter._id],
    });

    if (!newUser) {
      return next(appError("Error in creating new user", 500));
    }

    res.status(200).json({
      message: "User created successfully",
      token: generateToken(newUser._id, newUser.role),
    });
  } catch (err) {
    next(appError(err));
  }
};

const signInController = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  let formattedErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(500).json({ errors: formattedErrors });
  }

  try {
    const newEmail = email.toLowerCase();

    const userFound = await User.findOne({ email: newEmail });

    if (!userFound) {
      formattedErrors.general = "Invalid credentials";
      return res.status(500).json({ errors: formattedErrors });
    }

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      formattedErrors.general = "Invalid credentials";
      return res.status(500).json({ errors: formattedErrors });
    }

    res.status(200).json({
      message: "Logged in",
      token: generateToken(userFound._id, userFound.role),
    });
  } catch (err) {
    next(appError(err));
  }
};

module.exports = { signUpController, signInController };
