const express = require("express");
const cookieParser = require("cookie-parser");

const verifyToken = require("../auth/verifyToken");
const User = require("../models/User");

const router = express.Router();

router.use(verifyToken);

router.get("/playlists", async (req, res) => {
    const id = req.user._id;
    if (id.trim() === "") return res.status(404).send("Invalid id");

    const user = await User.findOne({ _id: id });
    if (!user)
        return res.status(404).send("Something went wrong! Please retry");

    // if user if there
    //
    const playlists = user.playlists.map(({ _id, name, songs, ...rest }) => {
        const fs = songs[0] ? songs[0].coverUrl : null;
        return { _id, name, firstSongCover: fs };
    });
    return res.status(200).json({ playlists });
});

router.get("/getsongs/:pid", async (req, res) => {
    const id = req.user._id;
    const pid = req.params.pid;
    if (id.trim() === "") return res.status(404).send("Invalid id");
    const user = await User.findOne({ _id: id });
    if (!user)
        return res.status(404).send("Something went wrong! Please retry");

    // if user if there
    //
    const playlist = user.playlists.find(
        (playlist) => playlist._id.toString() === pid
    );
    // console.log(playlist);
    return res.status(200).json({ playlist });
});

router.post("/addplaylist", async (req, res) => {
    const id = req.user._id;
    if (id.trim() === "") return res.status(404).send("Invalid id");

    const user = await User.findOne({ _id: id });
    if (!user)
        return res.status(404).send("Something went wrong! Please retry");

    // if user if there
    const playlistName = req.body.playlistName;
    // console.log(user.playlists);
    try {
        user.playlists.forEach((playlist) => {
            if (playlist.name === playlistName) {
                throw new Error("Another playlist with same name exists!");
            }
        });

        user.playlists = [...user.playlists, { name: playlistName, songs: [] }];

        // console.log(user.playlists);
        try {
            await user.save();
            return res.status(200).send("Playlist Added Successfuly");
        } catch (err) {
            return res.status(500).send("DB Error");
        }
    } catch (error) {
        res.status(409).send(error.message);
    }
});

router.post("/addsong", async (req, res) => {
    const id = req.user._id;
    if (id.trim() === "") return res.status(404).send("Invalid id");

    const user = await User.findOne({ _id: id });
    if (!user)
        return res.status(404).send("Something went wrong! Please retry");

    // if user if there
    const playlistName = req.body.playlistName;
    const song = req.body.song;
    // console.log(playlistId);
    songModel = {
        name: song.name,
        url: song.url,
        genre: song.genre,
        artists: song.artists,
        coverUrl: song.coverUrl,
        tags: song.tags,
        download: song.download,
    };
    try {
        const playlists = user.playlists
            .filter((playlist) => playlist.name == playlistName)[0]
            .songs

        playlists.addToSet(songModel)
          
        // console.log(user.playlists[0]);
        try {
            await user.save();
            return res.status(200).send("Song Added Successfuly");
        } catch (err) {
            return res.status(500).send("DB Error");
        }
    } catch (error) {
        res.status(409).send(error.message);
    }
});

module.exports = router;
