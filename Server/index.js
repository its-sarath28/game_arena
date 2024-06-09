const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute/authRouter");

require("dotenv").config();
require("./config/dbConnect");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
