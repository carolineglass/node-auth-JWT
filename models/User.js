const mongoose = require('mongoose');

//defining user document in db
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// must be the singular db collection name ex: user to collection users
// second arg is the schema 
const User = mongoose.model('user', userSchema);

module.exports = User;

