const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Character = require("../models/Character");

const { uploadToFirebase } = require("../utils/imageOperation");

const createAdmin = async (req, res, next) => {
  try {
    const name = "Super admin";
    const username = "super-admin";
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const role = "Admin";

    const userFound = await User.findOne({ email });

    if (!userFound) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role,
      });

      console.log("Admin created successfully");
    } else {
      console.log("Admin is present");
    }
  } catch (err) {
    console.log("Error in seeding admin:", err.message);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const characterName = "Gornak";
    const health = 200;
    const strength = 90;
    const attack = 60;
    const characterImagePath = path.join(__dirname, "../assets/Character1.jpg");

    const characterFound = await Character.findOne({ characterName });

    let imageURL = "";
    if (!characterFound) {
      const imageBuffer = fs.readFileSync(characterImagePath);
      const file = {
        originalname: path.basename(characterImagePath),
        buffer: imageBuffer,
      };

      imageURL = await uploadToFirebase(file);

      await Character.create({
        characterName,
        strength,
        attack,
        health,
        imageURL,
      });

      console.log("Character added successfully");
    } else {
      console.log("Character is present");
    }
  } catch (err) {
    console.log("Error in seeding character:", err.message);
  }
};

(async () => {
  await createAdmin();
  await createCharacter();
})();
