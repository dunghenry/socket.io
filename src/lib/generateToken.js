const jwt = require('jsonwebtoken');
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
    });
}
const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '10m'
    });
}

module.exports = { generateAccessToken, generateRefreshToken };