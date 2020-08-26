const mongoose = require('mongoose');

const activeAccountRequestSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, createIndexes: true },
    password: { type: String, required: true }
});

const ActiveAccountRequest = mongoose.model('ActiveAccountRequest', activeAccountRequestSchema);

module.exports = ActiveAccountRequest;