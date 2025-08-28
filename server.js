const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const GameRoutes = require("./Routes/GameRoutes");
const UserRoutes = require("./Routes/UserRoutes");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/games", GameRoutes);
app.use("/users", UserRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front-end/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../front-end/build/index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
