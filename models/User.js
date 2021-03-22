const mongoose = require('mongoose');
const { isEmail } = require('validator');


//defining user document in db
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }, 
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

//fire a func after(post) doc saved to db
// after 'save' event, fire second arg func
userSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc)
    next();
})

//fire a func before(pre) doc saved to db
//using 'this' keyword, so not using an arrow func
userSchema.pre('save', function(next) {
    console.log('user about to be created', this);
    next();
})

// must be the singular db collection name ex: user to collection users
// second arg is the schema 
const User = mongoose.model('user', userSchema);

module.exports = User;

