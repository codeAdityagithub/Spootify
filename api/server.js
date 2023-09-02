const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ncs = require("nocopyrightsounds-api");
const authRouter = require("./auth/auth");
const userRouter = require("./routers/user");

const connect = require("./utils/db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use(cookieParser());
app.use(express.json());


// auth file
app.use("/auth", authRouter);

app.use("/user", userRouter);

connect();
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
