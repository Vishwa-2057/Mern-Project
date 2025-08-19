const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/create-user", upload.single("image"), async (req, res) => {
  const { name, score, game } = req.body;
  const file = req.file;

  const userData = { name, score, game };
  if (file) {
    userData.image = {
      data: file.buffer,
      contentType: file.mimetype,
    };
  }

  const data = await User.create(userData);
  res.json({ data, message: "User added" });
});

router.get("/", async (req, res) => {
  const data = await User.find().populate("game", "name");
  res.json({ data, message: "All Users fetched" });
});


router.get("/get-user/:id", async(req,res) => {
    const data = await User.findById(req.params.id);
    res.json({data, message:"fetched User"})
})

router.delete("/delete-user/:id", async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message:"User deleted"})
})

router.put("/update-user/:id", upload.single("image"), async (req, res) => {
  const { name, score, game } = req.body;
  const file = req.file;

  const updateData = { name, score, game };
  if (file) {
    updateData.image = {
      data: file.buffer,
      contentType: file.mimetype,
    };
  }

  const data = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json({ data, message: "User updated" });
});

router.get("/image/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || !user.image?.data) {
    return res.status(404).send("Image not found");
  }

  res.set("Content-Type", user.image.contentType);
  res.send(user.image.data);
});


module.exports = router;