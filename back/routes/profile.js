const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const Product = require('../models/Products');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//Get User Info
router.get('/:username', (req, res, next) => {

    var ObjectId = mongoose.Types.ObjectId;
    let userId = new ObjectId(req.user._id);
    let username = req.params.username
    
    User.findOne({'username': username}).populate('items')
    .exec(function (err, User) {
        if (err) return next(err);
        if (!User) return res.json(401);
        res.json(User);
    })

    /* User.findById(userId).populate('items')
        .exec(function (err, User) {
            if (err) return next(err);
            if (!User) return res.json(401);
            res.json(User);
        }) */
});

module.exports = router;