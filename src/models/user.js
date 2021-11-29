const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error('Password length must be at least 7 characters');
            }
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password can't contain the word "password"`);
            }
        }
    }
});



module.exports = User