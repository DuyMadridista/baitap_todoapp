const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../model/model');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1y' });
    return { accessToken, refreshToken };
};

const AuthService = {
    register: async (name, email, password) => {
        try {
            const newUser = { name, email, password: bcrypt.hashSync(password, 10) };
            const user = new User(newUser);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    login: async (email, password) => {
        try {
            const user = await User.findOne().where('email').equals(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("Invalid password");
            }
            const { accessToken, refreshToken } = generateTokens(user);
            return { token: accessToken, refreshToken };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    refreshToken: async (token) => {
        try {
            if (!token) {
                throw new Error("Token not found");
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            const { accessToken, refreshToken } = generateTokens(decoded);
            return { token: accessToken, refreshToken };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    logout: async () => {
        try {
            return { message: "Logged out" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = AuthService;
