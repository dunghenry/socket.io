const User = require('../../models/user.model');
const UserToken = require('../../models/user.token');
const Otp = require('../../models/otp.model');
const bcrypt = require('bcrypt');
const logEvents = require('../../helpers/logEvents');
const { validationRegister, validationLogin } = require('../../lib/validation.user');
const { generateAccessToken, generateRefreshToken } = require('../../lib/generateToken');
class authController {
    static async register(req, res) {
        const { error, value } = validationRegister(req.body);
        if (error) {
            return res.status(400).json('Username, email or password is not valid');
        }
        try {
            const user = await User.findOne({ email: value.email });
            if (user) {
                return res.status(400).json("Email already in use!")
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(value.password, salt);
            const newUser = new User({
                username: value.username,
                email: value.email,
                password: hashedPassword
            });
            const savedUser = await newUser.save();
            const { password, ...others } = savedUser._doc;
            return res.status(201).json(others);
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
    static async login(req, res) {
        const { error, value } = validationLogin(req.body);
        if (error) {
            return res.status(400).json('Email or password is not valid');
        }
        try {
            const user = await User.findOne({ email: value.email });
            if (!user) {
                return res.status(404).json('User not found');
            }
            const isValidPassword = await bcrypt.compare(value.password, user.password);
            if (!isValidPassword) {
                return res.status(400).json('Incorrect password');
            }
            if (user && isValidPassword) {
                const { password, ...others } = user._doc;
                const accessToken = generateAccessToken(user._doc);
                const refreshToken = generateRefreshToken(user._doc);
                const newUserToken = new UserToken({
                    userId: user._doc._id,
                    refreshtoken: refreshToken
                })
                await newUserToken.save();
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 365 * 24 * 60 * 60 * 60
                });
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
    static async logout(req, res) {
        try {
            res.clearCookie("refreshToken");
            await UserToken.deleteOne({ userId: req.user.userId });
            return res.status(200).json("Logged out successfully!");
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
}

module.exports = authController;