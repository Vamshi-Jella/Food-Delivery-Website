// vendorId - Vendor model lo undi kabati - Vendor ni require/import chesukovali
const Vendor = require('../models/Vendor'); 
// Token ni verify chesukoni - JWT Token kavali
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

// Creating Middleware - it is async function with 3 parameters
// request send cheshaka - response ok ithey ne - e next ane function, nxt further mana actions ni perform cheyaniki allow chestadi
const verifyToken = async(req,res,next){
       //Headers lo Tokens ni pass chestunam
       //manam request send cheshey partisari kuda , Alongwith request, e Headers lo unna values kuda server ki vellutadi
       const token = req.headers.token;
       //We can write .barrierend instead of .token
       
       // okavela Token flase ithey
       if(!token){
              return res.status(401).json({error:"Token is required"});
       }
       // We are creating a promise using try-catch 
       try {
            // vendorId dwara vachina token ni decode cheshi & Database lo unna ID ni compare cheshi verify chestadi
            const decoded = jwt.verify(token, secretKey)
            // decode iyinadi e variable ki assign chestam
            //  mana token ni (const token = req.headers.token;) decode iyina vendorId to verify chestunam 
            // secretKey - .env file lo undi dani access chesukovali antey 
            // const dotEnv = require('dotenv');
            // dotEnv.config()
            // const secretKey = process.env.WhatIsYourName
            // WhatIsYourName="Food-Delivery-Website"
            // secretKey value("Food-Delivery-Website") assigned to variable (WhatIsYourName)
            
            // e decode cheshindi, vendorId(which is from vendorController.js) to verify chestunam
            const vendor = await Vendor.findById(decoded.vendorId);

       } catch (error) {
              
       }
}