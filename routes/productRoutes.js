const express = require('express');
const productController = require("../controllers/productController");

const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
//Here, we are adding the products. So, post method
//addProduct function(productController.js) lo "firmId= req.params.firmId" antey firmId = params nunchi get chestunam, kabati e ".firmId" ni dynamic ga route lo add cheyali

module.exports = router();

