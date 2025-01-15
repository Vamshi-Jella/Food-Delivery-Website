# Food-Delivery-Website
# Multi Vendor Restaurant APP
- First install node to our project
  - npm init -y
- Then install required packages modulus (Dependencies) 
  - Express , Mongoose, Dotenv, Body-parser, Nodemon  
  - npm install express mongoose dotenv body-parser nodemon
  - After install they can be seen in package.json - "dependencies"
  - Set main file as index.js - "main": "index.js",
  - We can give name, description & author in package.json

- To run the project , we have to define commands in two phases( Development & Deployment) in package.json -"scripts"
  - For Development phase - "dev": "nodemon run dev"
  - For Deployment phase - "start": "index" - where index file is gateway file which we generate output
  - "scripts": {
    "dev": "nodemon run dev",
    "start": "node index"
    },
  - npm run dev - Project will get excuted and shows output
  - nodemon vala file ni save chestey automatic ga changes update iyi output vastadi

- Create Server and Route in index.js
  - Creating Server 
  - " const express= require("express"); "
  - Manam install cheshi express ni import chesukoniki - require("express")
  - " const app = express(); "
  - express nunchi vastuna methods ani e app variable ki assign chestam
  - " const PORT=4000; " 
  - edo oka PORT no. estam - our application will run in our localhost at this PORT no. (localhost:4000)
  - " app.listen(PORT,()=>{
    console.log(`Server started & running at ${PORT}`);
    }); "
  - By using above Server, we are defining Routes
  - Creating Routes
  - " app.use('/home',(req,res)=>{
     res.send("<h1> Welcome");
     }); "
  - "localhost:4000/home" - edi browser lo type chestey above response("Welcome") vastadi


- Connecting with Database (MongoDB)
  - Go to the MongoDb site & signup
  - Create a new project - name it - click on create
  - Select cluster (free cluster) - click on create deployment
  - Then give a password & create database user
  - Remove old IP address & set IP address to 0.0.0.0 - so that we can access from anywhere
  - Go the Overview Cluster - click on "Connect - Drivers" - then copy MongoURL
  - Create a file - ".env"- store our MongoURL to a varaible
  - .env file lo ela variable ki link assign cheyali
  - " MONGO_URI="link<our_databaseuser_password>/Project_Name?" "
  - Replace <password>=our DataUser password
  - Write our Project Name in "mongodb.net/PROJECT-NAME?retry"
  - .env file lo unavi evariki share avadu
  - .env file lo unavi mana project ki access cheyali antey dotenv dependency package install chesukovali, dotenv ni oka variable ki assign cheyali
  - dotEnv.config() to .env file lo unavi access cheyavachu
  - " const dotEnv= require('dotenv'); "
  - " dotEnv.config(); "
  - write " process.env.Variable " whereever it required

  - Mongoose tho MongoDB database ki connect chestam
  - " const mongoose= require("mongoose"); "
  - " mongoose.connect(process.env.MONGO_URI)
  - .then(()=>console.log("MongoDB connected successfully!"))
  - .catch((error)=>console.log(error)) "

- Building APIs
  - Authentication - once register iyaka nxt time identity id tho login avachu ade authentication
  - Creating APIs - Models , Controllers, Routes

- Creating Models, Controllers, Routes

  - Each vendor ki authentication echi products add chesukovachu
  - Vendor ki unique Authentication kosam username, email password estam
  - VendorSchema properties tho eni records iyina create cheyachu -- avi tables lo save cheyaniki Controllers & Routes kavali
  - Controllers lo emo mana performance oka logic rastam
  - Create Models, Controllers, Routes folder
  - Create a Vendor.js file in models folder, vendorControllers.js in controllers folder, vendorRoutes.js in routes folder

- - Creating Models files - Vendor.js
  - Schema define cheyaniki mongoose kavali
  - " const mongoose=require("mongoose");"
  - Vendor properties(username, unique email, password) to schema define chestam
  - " const vendorSchema=new mongoose.Schema({
      username:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      }
    }); "
  - For reusing it , export Vendor model
  - " const Vendor = mongoose.model('Vendor',vendorSchema); "
  - " module.exports = Vendor; "

- vendorController.js
- - Creating Controllers files - vendorController.js
  - First import Vendor model which is two steps outside from controller file
  - " const Vendor=require('../models/Vendor'); "

- Vendor Registration through JWT token, bcryptjs
  - " const vendorRegister=async (req,res) => {
    const {username,email,password}=req.body; - #request(body-input form data) dwara vastai ga
    };"
  - Input dwara vachina Vendor properties - unique email ena? ani check cheshi - Ah email ni Token echi save chestam database lo - deni ey "Token based Authentication" antaru
  - By installing "Jwt token" dependency package - "JWT - jsonwebtoken"
  - Password ni hashing cheshi save chestam - by installing "bcryptjs" dependency package
  - "npm install jsonwebtoken bcryptjs" 
  - " const jwt = require('jsonwebtoken'); "
  - " const bcrypt = require('bcryptjs'); "
  
- - Vendor Registration function export cheyali
  -  const vendorRegister=async (req,res) => {
      const {username,email,password}=req.body; // Taking data(username, email, password) from body-input form data
      try {
        const vendorEmail= await Vendor.findOne({email}); //by using findone method-vendor nunchi email tesukoni, unique email ena? ani check chestam
        if (vendorEmail){ //already email unte true iyi - email taken ani vastadi
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10); //password ni hash chestunam, 10 - oka algorithm antey, 10 times exicute iyi - final ga vachina hashed password ni e variable ki assign chestunam
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

     module.exports = {vendorRegister} 

- vendorRoutes.js
- - Vendor (vendorRegister) nunchi vachey details ni Database ni store cheyaniki, oka Route kavali
  - Create a vendorRoutes.js in Routes folder
  - "const vendorController = require('../controllers/vendorController');"

    "const express = require('express');"
    // express lo unna oka inbuilt method ni import chesukoni, Route ni define cheyochu

    "const router = express.Router();"
    // e router dwara, oka API ki endpoint to Router define cheyochu
    //akkada vendorController-vendorRegister function lo - input form nunchi vachey details ni  Database ki post chestunam
    // Anduke ekkada Routes lo post method use chestunam, endpoint-register
    "router.post('/register',vendorController.vendorRegister);"
    // ela oka route create iyindi
    
    "module.exports = router;"
    // main router ni export chestey - dani lo unna ani routes export ithadi
  - index.js lo vendorRoutes file ni export cheshi http request cheyochu using middleware
    - " const vendorRoutes = require('./routes/vendorRoutes');"
    - middleware create cheydam - app.use('/path',filename)
    - " app.use('/vendor',vendorRoutes); " // path name vendor echam
  - ela vendorRoutes- oka route create chesham

- Converting into JSON format
  - Input fields nunchi vachey data ni JSON format lo pass cheyali by using "body-parser" package
  - Import body-parser in index.js 
  - "const bodyParser = require('body-parser');"
  - "app.use(bodyParser.json());" // Input fields data ni JSON format lo pass/convert chestadi using middleware method

- API testing 
  - path-vendor , endpoint-register to API ni test cheyochu
  - mana API - post method to create chesham - We can test it in "POSTMAN Software" - we can't test in browser
  - Go to the software - Select Contract Testing - Select method(POST) - Enter (localhost:PORT_No./path_name/endpoint) - Click on body - Select Raw - Select JSON - Enter properties data which is in vendorSchema
  - "username":"Apple",
    "email":"email@gmail.com",
    "password":"123"
  - Click on send - we will get the response & message 
  - enter npm run dev in terminal
  - if there is no errors - we will get "registered" - which is from "vendorController.js-vendorRegister function"
  - "res.status(201).json({message:"Vendor registered successfully"});" - we get this message in POSTMAN 
  - "console.log('registered');" - terminal
  - Go to the MongoDB site - our Project folder - click on browse collections - we can see our data
  - mana Models lo "vendor" ani unte - MongoDB lo "vendors" ani table create iyi untadi - danitlo manam post cheshina data untadi - id: , username:, email:,password:hashed_ga_untadi
  - ela mana post cheshina data - MongoDB (Database) lo record ithadi
  - Incase, already registered email estey - email already taken ani response vastadi - Database lo em record kadu
  

- Vendor Login
  - Vendor okasari register iyaka - direct login avochu
  - Create vendorLogin function
  - "const vendorLogin = async (req,res) => {
    "const {email,password} = req.body;" 
    //  Taking data (email,password) which is coming from body(input)
     try {
        // vendor model lo already register iyina email ni get cheshi, "vendor" ane variable ki assign chestunam
        // Database lo "vendors" table lo unna email
        // Input lo type cheshina email-password(login details) correct ena ani check chestunam
          "const vendor = await Vendor.findOne({email});" 
          //email ni Database lo find cheshi- "vendor" ki asiign chesham - epudu vendor ante  login aye candidate oka email id
         "if(!vendor || !(await bcrypt.compare(password, vendor.password))){  
            // await - enduku antey, bcrypt(hashed) format lo unna password ni normal ga convert cheyaniki time tesukuntadi 
            // Database(bcrypt format lo unna, password ni normal ga convert cheshi ) - dani, input dwara vachina login password(vendor.password) ni compare cheshi- match avakapothey (or) vendor(email) correct kakapothey - e response vastadi
            return res.status(401).json({error:"Invalid username or password"});
            // 401 - indicates error
         }"  
         // If email-password match ithey
         "res.status(200).json({success:"Login successful"});"
         "console.log(email);"
      } catch (error) {
        
     }
   }
   - "module.exports = {vendorRegister, vendorLogin}"

   - Same, vendorLogin ni Route ga cheyaniki - export cheshi, vendorRoutes.js lo endpoint echi Route create chestam(POST method tho) - POSTMAN lo check chestam
   - "router.post('/login',vendorController.vendorLogin);"