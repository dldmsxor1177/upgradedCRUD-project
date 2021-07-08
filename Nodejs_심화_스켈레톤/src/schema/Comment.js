const mongoose = require('mongoose');

const { Schema } = mongoose;
const replySchema = new Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Comment', replySchema);