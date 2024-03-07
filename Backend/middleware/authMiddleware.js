require('dotenv').config();
const jwt=require('jsonwebtoken');
const { User } = require('../model/model');

const verifySignUp = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            next();
        });
    },
    checkDuplicateEmail: (req, res, next) => {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
};

module.exports = verifySignUp;
