const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        min: 10,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 10000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);