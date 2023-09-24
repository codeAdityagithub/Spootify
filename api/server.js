const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const ncs = require("nocopyrightsounds-api");
const authRouter = require("./auth/auth");
const userRouter = require("./routers/user");

const connect = require("./utils/db");
const cookieParser = require("cookie-parser");

const app = express();

const streamApp = express();
streamApp.use(express.json());

streamApp.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

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
        const nextPage = page + 1;
        if (!results) {
            nextPage = undefined;
        }
        // console.log(results.json());
        return res.status(200).json({ results, nextPage });
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
        const nextPage = page + 1;
        if (!results) {
            nextPage = undefined;
        }
        return res.status(200).json({ results, nextPage });
    } catch (error) {
        return res.status(404);
    }
});

streamApp.get("/stream", async (req, res) => {
    try {
        const url = new URL(req.query?.url);

        if (url) {
            axios({
                method: "get",
                url: req.query.url,
                responseType: "stream",
            })
                .then((response) => {
                    const len = response.headers.get("content-length");
                    const type = response.headers.get("content-type");
                    if (len / 1024 / 1024 > 20) {
                        return res.status(503).send("File too large");
                    }
                    res.writeHead(206, "", {
                        "Accept-Ranges": "bytes",
                        "Content-Length": len,
                        "Content-Type": type,
                        "Content-Range": `bytes 0-${len - 1}/${len}`,
                    });
                    response.data.pipe(res);
                })
                .catch((error) => {
                    res.status(503).send("Error");
                });
        }
    } catch (error) {
        res.status(404).send("Error");
    }
});

streamApp.listen(8080);

const port = process.env.PORT || 8000;
app.listen(port);
