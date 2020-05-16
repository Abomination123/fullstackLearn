const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://Shokoman:Shokoman@cluster0-cvqcf.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    throw err;
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use(express.static(path.join(__dirname, "../build")));

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
