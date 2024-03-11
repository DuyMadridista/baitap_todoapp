const authService = require('../service/auth.service');

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await authService.register(name, email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const { token, refreshToken } = await authService.login(email, password);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            const { token: accessToken, refreshToken } = await authService.refreshToken(token);
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
    logout: async (req, res) => {
        try {
            await authService.logout();
            res.clearCookie('refreshToken');
            res.status(200).json({ message: "Logged out" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = authController;
