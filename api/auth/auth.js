const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyToken = require("./verifyToken");

const User = require("../models/User");

const router = express.Router();

const generateAccessToken = (user) => {
    return jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

// test route for checking tokens
router.get("/test", verifyToken, (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);

    res.send("hi");
});

// router.post("/refresh", (req, res) => {
//     //take the refresh token from the user
//     const refreshToken = req.body.token;

//     //send error if there is no token or it's invalid
//     if (!refreshToken)
//         return res.status(401).json("You are not authenticated!");
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.status(403).json("Refresh token is not valid!");
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         err && console.log(err);
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//         const newAccessToken = generateAccessToken(user);
//         const newRefreshToken = generateRefreshToken(user);

//         refreshTokens.push(newRefreshToken);

//         res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         });
//     });

//     //if everything is ok, create new access token, refresh token and send to user
// });

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
    user.refreshToken = refreshToken;
    await user.save();

    // sending cookie through httpOnly
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
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
