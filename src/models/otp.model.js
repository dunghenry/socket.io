const { Schema, model } = require('mongoose');
const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 60
        }
    }
}, {
    collection: 'otp'
});
const Otp = model('Otp', otpSchema);
module.exports = Otp;