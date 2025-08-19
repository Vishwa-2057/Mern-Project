const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("User", UserSchema);