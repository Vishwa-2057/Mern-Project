const express = require("express");
const router = express.Router();
const Game = require("../Models/Games");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create-game", upload.single("image"), async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const newGame = new Game({
            name: name,
            image: {
                data: file.buffer,
                contentType: file.mimetype
            }
        });

        const data = await newGame.save();
        res.status(201).json({ data, message: "Game added" });

    } catch (error) {
        console.error("Error uploading game:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/image/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game || !game.image || !game.image.data) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", game.image.contentType);
        res.send(game.image.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/", async(req, res) => {
    const data = await Game.find();
    res.json({data, message: "All Games fetched"})
})

router.get("/get-game/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        // Convert image buffer to base64 string
        let imageBase64 = null;
        if (game.image && game.image.data) {
            imageBase64 = `data:${game.image.contentType};base64,${game.image.data.toString('base64')}`;
        }

        res.json({
            data: {
                _id: game._id,
                name: game.name,
                image: imageBase64
            },
            message: "Fetched Game"
        });
    } catch (error) {
        console.error("Error fetching game:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.delete("/delete-game/:id", async(req,res) => {
    await Game.findByIdAndDelete(req.params.id);
    res.json({message:"Game deleted"});
})

router.put("/update-game/:id", upload.single("image"), async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;

        const updateData = { name };
        if (file) {
            updateData.image = {
                data: file.buffer,
                contentType: file.mimetype,
            };
        }

        const updatedGame = await Game.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        res.json({ data: updatedGame, message: "Game updated" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;