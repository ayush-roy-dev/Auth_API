const express = require('express');
const router = express.Router();
const {registerValidation, loginValidation} = require('../../users');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../../models/User');

router.post('/users/register', async (req, res) => {
    
    // Validation
    if (req.body.password !== req.body.password1) res.status(400).send('Passwords do not match!');
    const {error} = registerValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) res.status(400).send("Email already exists!");

    // Hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email, 
        password: hashPass
    });

    try {
        const savedUser = await user.save();
        res.send("User ID: " + savedUser._id);
    } catch (err) {
        res.status(400).send(err);
    }
    
        
});

router.post('/users/login', async (req, res) => {
    
    // Validation
    const {error} = loginValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) res.status(400).send("Invalid email or password!");
    
    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) res.status(400).send("Invalid email or password!");

    // Creating token
    const token = jwt.sign({_id: user._id}, process.env.SECKRET_TOKEN);

    res.json({
        token: token
    });

});

module.exports = router;