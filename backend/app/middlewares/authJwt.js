const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Time = db.time;
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
signout = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Time.findOneAndUpdate({
            username: user.username,
            logout: user.logout,
        },
            {
                $set: {
                    logout: Date.now()
                }
            },
            {
                upsert: true
            }).then().catch(err =>
                res.status(500).send({ message: err })
            )
        next();
        return;
    });
};
const authJwt = {
    verifyToken,
    signout
};
module.exports = authJwt;