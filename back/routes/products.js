const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Products');
//const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');

//MAYBE NOT NEEDED
router.get('/main', /* ensureLoggedIn(), */(req, res, next) => {
    Product.find()
    .then(prods => res.json(prods))
});

//GET SINGLE 
router.get('/id/:id', /* ensureLoggedIn(), */(req, res, next) => {
    let id = req.params.id
     Product.findById(id)
    .then(prod => res.json(prod))
});

//CREATE NEW PRODUCT
router.post('/new', uploadCloud.single('photo'), (req, res, next) => {
    console.log("NEW PRODUCT ENTERS");
    
    let itemOwner = req.user._id
    let { productName, productDescription, productPrice } = req.body;
    let photo = req.file.secure_url

    return new Product({
        ownerName: req.user.username,
        itemOwner,
        productName,
        productDescription,
        productPrice,
        photo
    }).save()
        .then((response) => {
            console.log(response);
            User.findByIdAndUpdate(req.user._id, { $push: { items: response._id } })
            .then((user) => { res.json(user) })
        }).catch(e => next(e))
})

module.exports = router;