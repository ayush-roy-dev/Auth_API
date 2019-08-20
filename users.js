const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');


module.exports = {
    authToken: (req, res, next) => {
        if (typeof req.headers.authorization == 'undefined') return res.status(500).json({ error: "Not Authorised!" });
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECKRET_TOKEN, (err, decoded) => {
            if (err) return res.status(500).json({ error: "Not Authorised!"});
            console.log(decoded);
            return next();        
        });
    },
    registerValidation: (body) => {
        const schema = {
            name: Joi.string().min(3).max(100).required(),
            email: Joi.string().min(10).required().email(),
            password: Joi.string().min(5).max(50).required(),
            password1: Joi.string().min(5).max(50).required()
        };
        return Joi.validate(body, schema);
    },
    loginValidation: (body) => {
        const schema = {
            email: Joi.string().min(10).required().email(),
            password: Joi.string().min(5).max(50).required()
        };
        return Joi.validate(body, schema);
    }
};

