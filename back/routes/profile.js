const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

//Get User Info
router.get('/:username', (req, res, next) => {

    var ObjectId = mongoose.Types.ObjectId;
    let username = req.params.username
    
    User.findOne({'username': username}).populate('items')
    .exec(function (err, User) {
        if (err) return next(err);
        if (!User) return res.json(401);
        res.json(User);
    })
    
});

module.exports = router;