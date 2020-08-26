const mongoose = require('mongoose');

const resetPasswordRequestSchema = new mongoose.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    confirm: { type: Boolean, default: false }
});

const ResetPasswordRequest = mongoose.model('resetPasswordRequest', resetPasswordRequestSchema);

module.exports = ResetPasswordRequest;