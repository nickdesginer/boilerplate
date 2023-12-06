const jwt = require("jsonwebtoken");
const status = require('http-status');
const mongoose = require("mongoose");
const user = mongoose.model("user");
const verifyToken = async(req, res, next) => {
    const bearerToken =
        req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];
    if (!bearerToken) {
        return res.status(status.UNAUTHORIZED).send("Unauthorized");
    }
    try {
        var token = bearerToken.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if (err) {
                return res.status(status.UNAUTHORIZED).send("Unauthorized");
            } else {
                var userExist = await user.findOne({ _id: decoded.userData._id });
                if (userExist == null) {
                    return res.status(status.UNAUTHORIZED).send("Unauthorized");
                } else {
                    return next();
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};

module.exports = {
    verifyToken
};