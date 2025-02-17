const vendorController = require('../controllers/vendorController');
const express = require('express');
// express lo unna oka inbuilt method ni import chesukoni, Route ni define cheyochu
const router = express.Router();
// e router dwara, oka API ki endpoint to Router define cheyochu
//akkada vendorController-vendorRegister function lo - input form nunchi vachey details ni  Database ki post chestunam - andukey POST method
// Anduke ekkada Routes lo post method use chestunam, endpoint-register 
router.post('/register',vendorController.vendorRegister);
// ela oka route create iyindi

router.post('/login',vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllVendors);
//manam records ni get chestunam ga andukey - router.get

router.get('/single-vendor/:id', vendorController.getVendorById);
// e id - getVendorById function lo - "const vendorId = req.params.id;"

module.exports = router;
// main router ni export chestey - dani lo unna ani routes export ithadi