const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Products');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
//const uploadCloud = require('../config/cloudinary.js');

//MAYBE NOT NEEDED
router.get('/new', /* ensureLoggedIn(), */(req, res, next) => {

});
const upload = multer({ dest: './public/uploads/' });
//CREATE NEW PRODUCT
router.post('/new', upload.single('photo'),/*[ensureLoggedIn() , uploadCloud.single('photo') ],*/(req, res, next) => {
    console.log("NEW PRODUCT ENTERS");
    
    let itemOwner = req.user._id
    let { productName, productDescription, productPrice } = req.body;
    let photo = req.file.url
    console.log(photo,'AQUI');

    Product.create({
        itemOwner,
        productName,
        productDescription,
        productPrice,
        photo
    })
        .then(() => {
            res.json(req.file)
        }).catch(e => next(e))
})

module.exports = router;