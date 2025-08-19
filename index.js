const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const GameRoutes = require("./Routes/GameRoutes");
const UserRoutes = require("./Routes/UserRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/games",GameRoutes);
app.use("/users",UserRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));



