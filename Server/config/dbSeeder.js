const bcrypt = require("bcryptjs");

const User = require("../models/User");

const createAdmin = async (req, res) => {
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
      return null;
    }
  } catch (error) {
    console.log(`Error in seeding`);
  }
};

createAdmin();
