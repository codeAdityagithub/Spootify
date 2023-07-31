const express = require("express");
const cors = require("cors");
const ncs = require("nocopyrightsounds-api");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
    })
);

app.get("/songs", async (req, res) => {
    try {
        const results = await ncs.getSongs();
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

app.get("/search", async (req, res) => {
    try {
        const { query, genre, mood } = req.query;
        console.log(req.query);
        const results = await ncs.search(
            {
                search: query,
                mood: mood,
                genre: genre,
            },
            0
        );
        console.log("fetched");
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

app.get("/songs/:genre", async (req, res) => {
    try {
        const genre = req.params.genre;
        const results = await ncs.search(
            {
                genre: genre,
            },
            0
        );
        // console.log("fetched");
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(404);
    }
});

app.get("/stream", async (req, res) => {
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

app.listen(8000);
