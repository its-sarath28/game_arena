const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/dbConnect");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
