const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const vendorRegister=async (req,res) => {
    const {username,email,password}=req.body;
    try {
        const vendorEmail= await Vendor.findOne({email}); //by using findone method-vendor nunchi email tesukoni, unique email ena? ani check chestam
        if (vendorEmail){ //already email unte true iyi - email taken ani vastadi
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10); //password ni hash chestunam, 10 - oka algorithm antey 10 times exicute iyi - final ga vachina hashed password ni e variable ki assign chestunam

    } catch (error) {
        
    }
} 