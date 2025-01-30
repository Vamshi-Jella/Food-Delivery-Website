// vendorId - Vendor model lo undi kabati - Vendor ni require/import chesukovali
const Vendor = require('../models/Vendor'); 
// Token ni verify chesukoni - JWT Token kavali
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

// Creating Middleware - it is async function with 3 parameters
// request send cheshaka - response ok ithey ne - e next ane function, nxt further mana actions ni perform cheyaniki allow chestadi
const verifyToken = async(req,res,next) => {
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
            // secretKey - .env file lo undi dani access chesukovali antey 
            // const dotEnv = require('dotenv');
            // dotEnv.config()
            // const secretKey = process.env.WhatIsYourName
            // WhatIsYourName="Food-Delivery-Website"
            // secretKey value("Food-Delivery-Website") assigned to variable (WhatIsYourName)
            
            // e token(const token = req.headers.token) decode cheshindi, vendorId(which is coming from vendorModel) to verify chestunam
            const vendor = await Vendor.findById(decoded.vendorId);
            // await - vendor Model nunchi vendorId vastundi kabati
            // Id ni get cheyaniki, Mongoose lo inbuilt function undi - "findById" 
            // decoded.vendorId - ekkada Id ni decode chestunam
            
            // While decoding incase, if there is any error - "vendor not found" - ani response vastadi 
            if(!vendor){
              return res.status(404).json({error:"vendor not found"});
            }

            // decode iyina vendorId ni actual/Database lo unna vendor Id(vendor._id) to verify chestunam
            req.vendorId= vendor._id;
            //req - e vendor Id ni request dwara vastundi kabati

            // e try block lo  unna code(verify) true ithey - next function excution ithadi
            next();


       } catch (error) {
          console.error(error);
          return res.status(500).json({error:"Invalid token"}); 
       }
};

module.exports = verifyToken;
