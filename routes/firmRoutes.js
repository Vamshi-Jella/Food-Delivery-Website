const express = require('express');
const firmController = require('../controllers/firmController');
//Manam Token based ga, Firm ni Vendor ki add chestunam. Ah Token ni verify cheshi, middleware lo save chesham adhey verifyToken. Ah middleware file ni kuda add(Import) chestaney - Vendor ki Firm add avutadi
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add-firm', verifyToken , firmController.addFirm);
//In this case, while defining router , we have to add middleware as a parameter

module.exports = router;