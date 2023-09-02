const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyToken = require("./verifyToken");

const User = require("../models/User");
const cookieParser = require("cookie-parser");

const router = express.Router();

// router.use(cookieParser());
// router.use((req, res, next) => {
//     origin = req.headers.origin;
//     if (origin == "http://localhost:5173") {
//         req.headers["access-control-allow-credentials"] = "true";
//     }
//     next();
// });

const generateAccessToken = (user) => {
    return jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

// test route for checking tokens
router.get("/test", verifyToken, (req, res) => {
    res.send("hi");
});

router.get("/refresh", (req, res) => {
    const cookies = req.cookies;
    // console.log("refresh", cookies.jwt);
    if (!cookies?.jwt)
        return res.status(401).json("You are not authenticated!");
    //take the refresh token from the user
    const refreshToken = cookies.jwt;
    // checking if user has refresh token
    // const user = User.findOne({ refreshToken });
    // if (!user) return res.status(401).json("You are not authenticated!");

    //send error if there is no token or it's invalid
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decodedUser) => {
            // if tampered with
            if (err) return res.status(403).json("Forbidden");

            const userData = {
                _id: decodedUser._id,
                username: decodedUser.username,
                email: decodedUser.email,
                premiumSubscriber: decodedUser.premiumSubscriber,
            };
            const newAccessToken = generateAccessToken(userData);
            // console.log("new access token", newAccessToken);
            res.status(200).json({
                accessToken: newAccessToken,
            });
        }
    );

    //if everything is ok, create new access token, refresh token and send to user
});

router.get("/logout", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    //take the refresh token from the user
    const refreshToken = cookies.jwt;
    // console.log(refreshToken);
    // checking if user has refresh token
    const user = await User.findOne({ refreshToken });
    if (!user)
        return res
            .clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .sendStatus(204);

    user.refreshToken = "";
    // console.log(user);
    try {
        await user.save();
    } catch (err) {
        return res.status(500).send("Database Error, not able to logout");
    }

    return res
        .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" })
        .sendStatus(204); // secure true prod
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // checking if user exists
    const user = await User.findOne({ email });
    if (!user)
        return res
            .status(404)
            .send("User Not Found! Please Register or check for Typo");

    // comparing passwords
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).send("Incorrect password");

    // valid user then data
    const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        premiumSubscriber: user.premiumSubscriber,
    };

    // creating accesstoken and refreshtoken
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    // setting refreshtoken in db for further reference
    // console.log(refreshToken);
    user.refreshToken = refreshToken;
    try {
        await user.save();
    } catch (err) {
        return res.status(500).send("Database Error, not able to save");
    }

    // sending cookie through httpOnly
    // res.header("Access-Control-Allow-Origin: http://localhost:5173/");
    // res.header("Access-Control-Allow-Credentials: true");
    // res.header("Access-Control-Allow-Methods: GET, POST");
    // res.header("Access-Control-Allow-Headers: Content-Type, *");

    res.cookie("jwt", refreshToken, {
        // domain: "127.0.0.1",
        // path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ ...userData, accessToken });
});

router.post("/register", async (req, res) => {
    // taking credentials from body
    const { username, email, password } = req.body;

    // checking if user already exists
    if (await User.exists({ email: email })) {
        return res.status(409).send("User Already Exists! Please login");
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    // saving to db
    try {
        await newUser.save();
        return res.status(200).send("User saved succesfully");
    } catch (error) {
        return res.status(500).send("Cannot save user Try Again");
    }
});

module.exports = router;
