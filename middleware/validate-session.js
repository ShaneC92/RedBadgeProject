const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const token = req.headers.authorization;
        
        if(!token){
            return res.status(401).send({
                auth: false,
                message: "No token has been provided"
            })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(!err && decoded){
                    User.findOne({
                        where: {
                            id: decoded.id
                        }
                    }, console.log(decoded))
                    .then(user => {
                        if(!user) throw 'err'
                        req.user = user;

                        next();
                    })
                    .catch(err => next(err))
                } else {
                    req.errors = err;
                    return res.status(500).send('Not Authorized')
                }
            })
        }
    }
}

module.exports = validateSession;