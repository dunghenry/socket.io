const { Schema, model } = require('mongoose');
const userTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    refreshtoken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 365 * 24 * 60 * 60
    }
}, {
    collection: 'token'
})
const UserToken = model('UserToken', userTokenSchema);
module.exports = UserToken;

