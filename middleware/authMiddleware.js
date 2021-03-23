const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //check that jwt exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

//check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                //makes the user accessible by the views
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    };
};

module.exports = { requireAuth, checkUser };