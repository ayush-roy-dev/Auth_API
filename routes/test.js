const express = require('express');
const router = express.Router();
const {authToken} = require('.././users');

router.get('/', authToken, (req, res) => {
    res.send('Random that you should not access!');
});

module.exports = router;