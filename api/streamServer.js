const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

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

app.listen(8001);
