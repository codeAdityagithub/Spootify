const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ncs = require("nocopyrightsounds-api");
const authRouter = require("./auth/auth");
const userRouter = require("./routers/user");

const connect = require("./utils/db");

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

connect();
// auth file
app.use("/auth", authRouter);

app.use("/user", userRouter);

// public routes
app.get("/songs", async (req, res) => {
    const page = Number(req.query.page);
    try {
        const results = await ncs.getSongs(!isNaN(page) ? page : 0);
        // console.log(results.json());
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

app.get("/search", async (req, res) => {
    try {
        const { query, genre, mood } = req.query;
        const results = await ncs.search(
            {
                search: query,
                mood: mood,
                genre: genre,
            },
            0
        );
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

app.get("/songs/:genre", async (req, res) => {
    try {
        const genre = req.params.genre;
        const page = Number(req.query.page);
        const results = await ncs.search(
            {
                genre: genre,
            },
            page
        );
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

const port = process.env.PORT || 8000;

app.listen(port);
