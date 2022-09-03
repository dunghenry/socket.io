const User = require('../../models/user.model');
const logEvents = require('../../helpers/logEvents');
const mongoose = require('mongoose');
class userController {
    static async getUser(req, res) {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Id is incorrect');
        }
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json('User not found');
            }
            const { password, ...others } = user._doc;
            return res.status(200).json(others);
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
}

module.exports = userController;