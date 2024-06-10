const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRoute/authRouter");
const characterRouter = require("./routes/characterRoute/characterRouter");
const roomRouter = require("./routes/roomRoute/roomRouter");

const globalErrorHandler = require("./middlewares/globalErrorHandler");

require("dotenv").config();
require("./config/dbConnect");
require("./config/dbSeeder");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/character", characterRouter);
app.use("/api/v1/room", roomRouter);

//global errors
app.use(globalErrorHandler);

//404 Error
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - File not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
