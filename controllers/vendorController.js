const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey= process.env.WhatIsYourName ;
// process.env dwara env lo unna key 'secretKey' variable ki assign chesham

const vendorRegister=async (req,res) => {
    const {username,email,password}=req.body;
    try {
        const vendorEmail= await Vendor.findOne({email}); //by using findone method-vendor nunchi email tesukoni, unique email ena? ani check chestam
        if (vendorEmail){ //already email unte true iyi - email taken ani vastadi
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10); //password ni hash chestunam, 10 - oka algorithm antey 10 times exicute iyi - final ga vachina hashed password ni e variable ki assign chestunam
        // req.body - body nunchi vastuna input values ni Database lo store cheyaniki - oka instance ni create cheshi dani dwara , records - Database lo store cheyavachu
        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        }); // ela instance ki values pass cheshi store chestam , password ki hashedPassword value ni pass chestam
        await newVendor.save(); // save method to Database lo save chestam
        res.status(201).json({message:"Vendor registered successfully"});
        // 200-299 unna ani kuda success oka codes
        // if e data successfully ga save ithey ne ah message vastadi
        // data save ithey - 201  success code to e message response eyamamni meaning above code
        console.log('registered'); // console lo chupiyaniki

    } catch (error) {
        console.error(error); // asal error enti anedi console lo chupiyaniki
        res.status(500).json({error:"Internal server error"});
        // 500 anedi error code
        // mana response error(status(500)) ithey e message vastadi
    }
} 

const vendorLogin = async (req,res) => {
    const {email,password} = req.body; //  Taking data (email,password) which is coming from body(input)
     try {
        // vendor model lo already register iyina email ni get cheshi, "vendor" ane variable ki assign chestunam
        // Database lo "vendors" table lo unna email
        // Input lo type cheshina email-password(login details) correct ena ani check chestunam
          const vendor = await Vendor.findOne({email}); //email ni Database lo find cheshi- "vendor" ki asiign chesham - epudu vendor ante  login aye candidate oka email id
         if(!vendor || !(await bcrypt.compare(password, vendor.password))){  
            // await - enduku antey, bcrypt(hashed) format lo unna password ni normal ga convert cheyaniki time tesukuntadi 
            // Database(bcrypt format lo unna, password ni normal ga convert cheshi ) - dani, input dwara vachina login password(vendor.password) ni compare cheshi- match avakapothey (or) vendor(email) correct kakapothey - e response vastadi
            return res.status(401).json({error:"Invalid username or password"});
            // 401 - indicates error
         } 
         
         const token =jwt.sign({vendorId:vendor._id},secretKey,{ expiresIn: "1h"});
         // jwt.sign() - inbuilt method - deni tho properties base chesukoni - Token generate cheyochu
         // vendor oka "_id" property ni "vendorId" ki assign chestunam

         // If email-password match ithey
         res.status(200).json({success:"Login successful",token});
         console.log(email,"this is token", token);
     } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
     }
}


const getAllVendors = async (req,res) => {
    try {
        //Manam first, vendor model/table nunchi records ni GET chestunam
        const vendors= await Vendor.find().populate('firm');
        //vendor records tho patu, vendor lopala unna firm records ni kuda get cheydam anukutunam kabati - populate method use chestam
        //populate('firm')- firm table nunchi records ni vendor table lo chupiyali anukutunam kabati firm ni populate method ki pass cheyali

        res.json({vendors});
        //e vendors records ni JSON format lo objects lo chupistam
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}


module.exports = {vendorRegister, vendorLogin, getAllVendors};