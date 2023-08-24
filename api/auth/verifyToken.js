const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json("You are not authenticated!");

    const token = authHeader.split(" ")[1];
    // console.log("token", token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("Token is not valid!"); //if token is tampered with
        }
        req.user = user;
        next();
    });
};

module.exports = verify;
