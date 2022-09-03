const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        if (accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error?.name === 'TokenExpiredError') {
                    return res.status(403).json('AccessToken expired');
                }
                else if (error) {
                    return res.status(403).json('AccessToken is not valid');
                }
                req.user = decoded;
                next();
            })
        }
        else {
            return res.status(404).json('AccessToken not found');
        }
    }
    else {
        return res.status(401).json("You're not authenticated");
    }
}
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.id) {
            next();
        }
        else {
            return res.status(401).json("You're not authenticated");
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuthorization };