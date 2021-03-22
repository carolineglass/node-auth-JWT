const User = require('../models/User')

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
        const user = await User.create({email, password})
        //set status and send a json user obj
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    res.send('user login');
}
