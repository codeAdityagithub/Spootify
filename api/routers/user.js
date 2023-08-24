const express = require("express");

const verifyToken = require("../auth/verifyToken");
const User = require("../models/User");

const router = express.Router();

router.use(verifyToken);

router.get("/playlists/:id", (req, res) => {
    const id = req.params.id;
    if (id.trim() === "") return res.status(404).send("Invalid id");

    const user = User.findOne({ _id: id });
    if (!user)
        return res.status(404).send("Something went wrong! Please retry");

    // if user if there
    const playlists = user.playlists;
    return res.status(200).json({ playlists });
});

module.exports = router;
