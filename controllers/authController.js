const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    let errors = {
        email: '',
        password: ''
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors
    }

    //validation errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// create jwt 
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    //returnd a token with a signature, payload, secret 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    // create new user in db with the req.body properties with a try/catch block
    try {
        //User.create returns a promise await will save the user when resolved
        const user = await User.create({email, password});
        const token = createToken(user._id);
        //creating the cookie with the cookie-parser
        res.cookie('jwt', token, { httpOnly: true,  maxAge: maxAge * 1000 } );
        //set status and send a json user obj
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    res.send('user login');
}
