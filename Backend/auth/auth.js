const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { User } = require('../model/model');
require('dotenv').config();
const  JWT_SECRET  = process.env.JWT_SECRET;
const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1y' });
    return { accessToken, refreshToken };
};
const authController = {
    register: async (req, res) => {
        try {
            const newUser = {name:req.body.name,email:req.body.email,password:bcrypt.hashSync(req.body.password,10)};
            const user=new User(newUser);
            await user.save();
            res.status(201).json(user );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne().where('email').equals(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("Invalid password");
            }
            const { accessToken, refreshToken } = generateTokens(user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            res.status(200).json({ token: accessToken });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    refeshToken: async (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                throw new Error("Token not found");
            }
            jwt.verify(token, JWT_SECRET, (err, user) => {
                if (err) {
                    throw new Error("Invalid token");
                }
                const { accessToken, refreshToken } = generateTokens(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict'
                });
                res.status(200).json({ token: accessToken });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken');
            res.status(200).json({ message: "Logged out" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = authController;