const User = require('../../models/user.model');
const UserToken = require('../../models/user.token');
const Otp = require('../../models/otp.model');
const bcrypt = require('bcrypt');
const logEvents = require('../../helpers/logEvents');
const { validationRegister } = require('../../lib/validation.user');
class authController {
    static async register(req, res) {
        const { error, value } = validationRegister(req.body);
        if (error) {
            return res.status(400).json('Username, email or password is not valid');
        }
        try {
            const user = await User.findOne({ email: value.email });
            if(user){
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
            return res.status(200).json(others);
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error)
        }
    }
}

module.exports = authController;