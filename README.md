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
    - "const {email,password} = req.body;" 
    - Taking data (email,password) which is coming from body(input)
     - try {
        -   vendor model lo already register iyina email ni get cheshi, "vendor" ane variable ki assign chestunam
        - Database lo "vendors" table lo unna email
        - Input lo type cheshina email-password(login details) correct ena ani check chestunam

        - "const vendor = await Vendor.findOne({email});" 

        - email ni Database lo find cheshi- "vendor" ki asiign chesham - epudu vendor ante  login aye candidate oka email id
        - "if(!vendor || !(await bcrypt.compare(password, vendor.password))){  
            - await - enduku antey, bcrypt(hashed) format lo unna password ni normal ga convert cheyaniki time tesukuntadi 
            -  Database(bcrypt format lo unna, password ni normal ga convert cheshi ) - dani, input dwara vachina login password(vendor.password) ni compare cheshi- match avakapothey (or) vendor(email) correct kakapothey - e response vastadi

            - "return res.status(401).json({error:"Invalid username or password"});"
            - 401 - indicates error
         - }"  

         - "const token =jwt.sign({vendorId:vendor._id},secretKey,{ expiresIn: "1h"});"
         - jwt.sign() - inbuilt method - deni tho properties base chesukoni - Token generate cheyochu
         -  vendor oka "_id" property ni "vendorId" ki assign chestunam

         - If email-password match ithey
         - "res.status(200).json({success:"Login successful",token});"
         - "console.log(email,"this is token", token);"
     - } catch (error) {
         - "console.log(error);"
         - "res.status(500).json({error:"Internal server error"});"
      - }
  - }
   - "module.exports = {vendorRegister, vendorLogin}"

   - Same, vendorLogin ni Route ga cheyaniki - export cheshi, vendorRoutes.js lo endpoint echi Route create chestam(POST method tho) - POSTMAN lo check chestam
   - "router.post('/login',vendorController.vendorLogin);"

  - ela Vendor oka basic Authentication complete iyindi

- JWT Token
  - MongoDB lo each Vendor ki oka unique id create ithadi,security kosam ede id ni Token ga marustam - ade JWT Token 
  - Incase,MongoDB lo unna id vary valaki tesina, expose iyina, vary vallu e Vendor account ni access cheyakunda, e Tokens use ithadi
  - "JSON Web Tokens-jwt.io" website lo ela vendor property values bati Token generate ithundi ani visual ga untadi
  - Vendor oka properties details, values bati Tokens generate ithadi
  - Anduke JWT package install chesukunam

  - vendorLogin function lo Token create chestunam, after successful ga Login iyaka Token generate chestunam based on the unique id
  - Install JWT package
  - "const jwt = require('jsonwebtoken');"
  - "const token =jwt.sign({vendorId:vendor._id},secretKey,{ expiresIn: "1h"});"
  - jwt.sign() - inbuilt method - deni tho, properties base chesukoni - Token generate cheyochu
  - vendor oka "_id" property ni "vendorId" ki assign chestunam
  - secretKey - second parameter ga pass chestam
  - Third parameter - optional - "{ expiresIn: "1h"}" pass chestunam - antey 1hr trvata Token expire iyi, nko kothadi generate ithadi
  - Secret key mana own ga create chestam
  - Creating Secret_key
  - " WhatIsYourName="Food-Delivery-Website" "
  - Secret key kosam, dotenv lo variable assign cheshi, dani access cheyaniki "dotenv" ni import chesukovali vendorControllers.js file loki - by dotenv.config() method
  - "const dotEnv = require('dotenv');"
  - "dotEnv.config();"
  - "const secretKey= process.env.WhatIsYourName ;"
  - process.env dwara env lo unna mana secret key, 'secretKey' variable ki assign chesham
  - secretKey - parameter ga pass chestam
  - "const token =jwt.sign({vendorId:vendor._id},secretKey,{ expiresIn: "1h"});"
  - "res.status(200).json({success:"Login successful",token});"
  - "console.log(email,"this is token", token);"
  - Token ni console lo chupistadi, Login iyina everytime, Token console lo vastadi - even without changing any properties - every Login ki different Token generate ithadi - Security ga chala help ithadi e Tokens (JWT Tokens)


- Adding Firm/Restaurant to Vendor
  - Each Vendor ki - oka Firm/Restaurant untadi - ah Firm lo koni products untai 
  - Every Vendor ki unique Tokens generate avadam vala - Customer products ni select chesukuntey - crt ga ade Restaurant/Firm nunchi ey, vala Vendor ki select avutadi
  - Vendor ki Token based approach to Restaurant/Firm add chestam
  - We can't add Firm using id - because adi Database lo static ga akkada ne untadi, change avadu , security ga safe approach kadu
  - If e id dwara compare chestey, request send cheshina partisari, Database lo interact(velli) check(compare) cheydam vala - application slow/late avutadi
  - JWT Token ithey - Database lo undadu - Login iyina travta ne , Token vastadi 
  - ala vachina Token ni - manam server ki request send cheshey tapudu, e token ni kuda send chestam - e Token crt ithane, server manaku crt response vastadi
  - manam Login iyina partisari Token change ithadi kabati, ede safe approach

- Vendor ki - Firm/Restaurants untai
- oka Restaurant ki - different address, places lo untai kabati - direct, ani Restaurants ni kalipi - okate Firm ga consider chestam

- Creating Firm
  - Same Firm ki model, controller, route create cheyali, Firm-Vendor ki relation create cheyali

- Creating Firm Model
  - Firm Model properties : { firmName, area,category,region, offer, image}
  - e properties to schema create chestam
  - Model kabati file name with Capital letter lo - Firm.js in models folder
  - e Firm ni Vendor ki add cheshey tapudu, Token based ga add cheydam anukunam kabati
  - First firm ready iyaka, Token ni initiate cheshi, ah Token dwara Firm ni Vendor ki add cheydam
  - "const firmSchema= new mongoose.Schema({
      firmName: {
        type: String,
        required: true,
        unique:true
      },
      area: {
        type: String,
        required: true,
      },
      category:{
        type:[
            {
                type:String,
                enum:['Veg', 'Non-Veg']
            }
         ]
      },
    - Multiple Values ki - properties ela rayali
      region:{
        type:[
            {
               type:String,
               enum: ['South-Indian','North-Indian','Chinese','Bakery']   
            }
         ]
      },
      offer:{
        type:String,
      },
      image:{
        type:String
      },
      vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vendor'
        }
      ]
      - epudu ithey type lo - default method pass cheshamo, apudu e Firm ah Vendor Model ki link ithadi / relate chestunam
      - nko key value eyali - reference -"ref" - ae Model tho - Database lo unna ae table tho, e Firm table relate avutundi / relate cheyali ani
      - ela Firm-Vendor relation form chestam
      
    });"
  
  - ela Firm Model create chesham
  - e Firm Model ni export cheyali 
  - "const Firm = mongoose.model('Firm', firmSchema);"
  - "module.exports= Firm;"

  - elage e relation ni Vendor Model lo add cheyali
  - " firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
     ]" - edi vendorSchema lo add cheyali
  - ela Firm-Vendor relation form chestam

- Creating Firm Controller - firmController.js
  - e Firm ki vendor add cheyaniki - Controller kavali - e Controller lo logic rastam 
  - logic rayaniki Token awasaram - Ah Toekn already "vendorController.js" lo "vendorId" ni base chesukoni undi
  - e Token ni verify cheshi & e Token dwara, Firm ni vendor loki add cheydaniki - e Middleware use avutadi
  - e verifyToken dwara Firm ni vendor loki add cheyochu
  - Creating Middleware
    - Create a Middleware folder - verifyToken.js - e file lo Token ni verify cheyaniki logic rastam
    
    - vendorId - Vendor model lo undi kabati - Vendor ni require/import chesukovali
    - "const Vendor = require('../models/Vendor');"
    - Token ni verify chesukoni - JWT Token kavali
    - "const jwt = require('jsonwebtoken');"

    - Creating Middleware - it is async function with 3 parameters
    -  request send cheshaka - response ok ithey ne - e next ane function, nxt further mana actions ni perform cheyaniki allow chestadi
    - "const verifyToken = async(req,res,next){
       - Headers lo Tokens ni pass chestunam
       - manam request send cheshey partisari kuda , Alongwith request, e Headers lo unna values kuda server ki vellutadi
       const token = req.headers.token;
       - We can write .barrierend instead of .token
       
       - okavela Token flase ithey
       - "if(!token){
             - return res.status(401).json({error:"Token is required"});
         - }
         - We are creating a promise using try-catch 
       - "try {
            - vendorId dwara vachina token ni decode cheshi & Database lo unna ID ni compare cheshi verify chestadi
            - "const decoded = jwt.verify(token, secretKey);"
            - decode iyinadi e variable ki assign chestam
            - secretKey - .env file lo undi dani access chesukovali antey 
            - "const dotEnv = require('dotenv');"
            - "dotEnv.config();"
            - "const secretKey = process.env.WhatIsYourName;"
            - WhatIsYourName="Food-Delivery-Website"
            - secretKey value("Food-Delivery-Website") assigned to variable (WhatIsYourName)
            
            - e token(const token = req.headers.token) decode cheshindi, vendorId(which is coming from vendorModel) to verify chestunam
            - "const vendor = await Vendor.findById(decoded.vendorId);"
            - await - vendor Model nunchi vendorId vastundi kabati
            - Id ni get cheyaniki, Mongoose lo inbuilt function undi - "findById" 
            - Id ni get cheshi - "vendor ane variable ki assign chestunam
            - decoded.vendorId - ekkada Id ni decode chestunam
            
            - While decoding incase, if there is any error - "vendor not found" - ani response vastadi 
            - "if(!vendor){
              - return res.status(404).json({error:"vendor not found"});
             - }

            - decode iyina vendorId ni actual/Database lo unna vendor Id(vendor._id) to verify chestunam
            - "req.vendorId= vendor._id;"
            - req - e vendor Id ni request dwara vastundi kabati

            - e try block lo  unna code(verify) true ithey - next function excution ithadi
            - "next();"


         - " } catch (error) { 
              - "console.error(error);"
              - "return res.status(500).json({error:"Invalid token"});"
          - }"
    - };"
   
   - Export this verifyToken
   - "module.exports = verifyToken;"

- firmController.js
  - e verifyToken dwara Firm ni vendor loki add cheyochu - daniki firmController.js file lopana logic rayali
  - "const Firm = require('../models/Firm');"
  - "const Vendor = require('../models/Vendor');"
  - "const multer = require('multer');"
  - - Adding Images
  - Multer package - dwara Image ni Database lo save cheyochu 
  - install Multer package - "npm install multer"
  - "const multer = require('multer');"
  - oka standard format to Images ni save chestam
  - Create a uploads folder - Destination folder - where the uploaded images will be stored
  - "const storage = multer.diskStorage({
      -  destination: function(req,file,cb){
           - cb(null,'uploads/'); // Destination folder - where the uploaded images will be stored
       - },
       - filename:function(req,file,cb){
         - //cb(null,Date.now() + '-' + file.originalname);
         -  cb(null, Date.now() + path.extname(file.originalname));
         - Generating a unique filename
        - }
  - });"
  - "const upload = multer({storage: storage});"

  - "const addFirm = async (req,res) => {
   - try {
        - body nunchi vastunna properties
        - const {firmName, area, category, region, offer} = req.body;

        - Image - remaining properties to separate ga vastundi kabati
        - "const image = req.file? req.file.filename: undefined;"

        - vendorId kuda kavali - enduku antey vendor ID base meda Firm ni Vendor ki add chestunam ga
        - "const vendor = await Vendor.findById(req.vendorId);"

        - Incase vendor fail ithey 
        - "if(!vendor){
          -  res.status(404).json({message:"Vendor not found"});
        - }" 
        - "if(vendor.firmlength > 0){
           - return res.status(400).json({message:"Vendor can have only one firm"});
        - }"

        - oka Instance dwara e properties nunchi vastunna values ni, records/Database lo save chestam
        - "const firm = new Firm({
          - "firmName, area, category, region, offer, image, vendor:vendor._id;"
          - Firm.js lo - vendor property kuda undi - So, (in behalf of vendor property value) - we are passing vendorId
        - });"
        - Save this Instance
        - "await firm.save();"
        - Save iyaka, response chupiyaniki oka promise kavali - So edi anta try-catch block lo chestam
        
        - Firm successfully ga add ithey
        - "return res.status(200).json({message:"Firm Added successfully"});"

    - "} catch (error) {
      - "console.error(error);"
      - "res.status(500).json("Internal server error");"
     - }"
   - };"

   - "module.exports = { addFirm:[upload.single('image'), addFirm] }"
   - Image unte ela export cheyali

 - firmRoutes.js
    - Firm ni add cheyaniki Route kavali
    - "const express = require('express');"
    - "const firmController = require('../controllers/firmController');"
    - Manam Token based ga, Firm ni Vendor ki add chestunam. Ah Token ni verify cheshi, middleware lo save chesham adhey verifyToken. Ah middleware file ni kuda add(Import) chestaney - Vendor ki Firm add avutadi
    - "const verifyToken = require('../middlewares/verifyToken');"

    - "const router = express.Router();"

    - "router.post('/add-firm', verifyToken , firmController.addFirm);"
    - In this case, while defining router , we have to add middleware as a parameter

    - "module.exports = router;"
    - Also Import this firmRoutesfile.js in index.js file
    - "const firmRoutes = require('./routes/firmRoutes');"
    - And create midddleware & give separate path for firmRoutes in index.js
    - "app.use('/firm',firmRoutes);"
    - ("firms"- ane table create iyi untadi)

- Adding Firm to Vendor 
  - Open POSTMAN Software 
  - Database Server start iyaka ne (npm run dev) - API testing cheyochu, POSTMAN Software lo
  - Register & Login a new vendor (localhost:4000/vendor/register) & cross check in Database ("firms"- ane table create iyi untadi)
  - Okasari ah vendor details to login ithey - akkada token form iyi untadi , ah token to firm ki add chestam
  - Adding Firm - By passing Token through Headers
    - Select new windows in POSTMAN 
    - POST method - localhost:4000/firm/add-firm
    - Login iyaka vachey token ni Headers lo pass chestunam, Copy that token
    - Select Header - Give the values for key & value tables
    - key = token ( token - which we have write in verifyToken.js - "const token = req.headers.token")
    - value = Login iyaka vachey token 
    - Select JSON - write properties
    - {
      - "firmName":"Paradise",
      -  "area":"Begumpet",
      -  "category":["Veg","Non-Veg"],
      -  "region":["South-Indian","North-Indian"],
      -  "offer":"45% off",
      -  "image":"example.jpg"
    - }
    - Click on Send - We will get response ("firm added successfully")
    - Go the Database - firms Table - A new table is added
    - If we check in vendors table - In Newly created vendor, firm record is not added
    - For that go the filmController.js file
      - "const savedFirm = await firm.save();" 
      - Manam create cheshina firm ni "savedFirm" loki assign chesham
      - Save iyaka, response chupiyaniki oka promise kavali - So edi anta try-catch block lo chestam
       
      - vendor table lo - firm property loki - e savedFirm dwara, manam create cheshina firm(firm record values) ni push chestam(by push method)
      - "vendor.firm.push(savedFirm);"
      - Create a new firm in POSTMAN and We can see now in vendors Table(Database lo), a value is assigned to the firm property
      - vendor lo kuda e firm record ni save cheyali
      - "await vendor.save();"
      - Create a new firm in POSTMAN & check in Database
      - vendor table lo -  ah vendor ki firm property ki value assign ithadi
      - firm table lo - ah firm ki vendor property ki value assign ithadi
      - ela Token base chesukoni, firms ni vendors ki add chestunam
    - Same Token to Firms ni create chestey - oke Vendor ki 2 firms create ithadi - arrays lo 2 values create ithadi
    - Vendors Table lo - ah Vendor ki firm property lo, values(IDs) ani array lo assign ithadi

- Get Vendor Records
  - Database lo chustey values - IDs laga visible ithadi, adhey Names tho visibile avali antey - Controllers lo change cheyavachu (or) - GET method dwara API  create cheshi, ah API tho vendor lopala unna Firms ni detail ga chupiyochu 
  - Go to the vendorController.js - create getAllVendors function & export it
    - "const getAllVendors = async (req,res) => {
       - try {
          - Manam first, vendor model/table nunchi records ni GET chestunam
          - "const vendors= await Vendor.find().populate('firm');"
          - vendor records tho patu, vendor lopala unna firm records ni kuda get cheydam anukutunam kabati - populate method use chestam
          - populate('firm')- firm table nunchi records ni vendor table lo chupiyali anukutunam kabati firm ni populate method ki pass cheyali

          - "res.json({vendors});"
          - e vendors records ni JSON format lo objects lo chupistam
       - } catch (error) {
          - console.log(error);
          - res.status(500).json({error:"Internal server error"});
         - }
     - }"
     - Export this function
     - "module.exports = {vendorRegister, vendorLogin, getAllVendors};"
     - Creating Route - manam records ni get chestunam ga andukey - router.get
     - "router.get('/all-vendors',vendorController.getAllVendors);"
     - GET method kabati - POSTMAN & Browser lo kuda test cheyochu
     - POSTMAN - GET method - localhost:4000/vendor/all-vendors - ani details JSON format lo vastai
     - Browser - localhost:4000/vendor/all-vendors - We can see all records in browser

  - Fetching Single Individual Vendor Records on ID based
   - vendorController.js
   - "const getVendorById = async (req,res) => {
      - "const vendorId = req.params.id;"
      - Manam ID based meda vendor records ni Get chestunam 
      - vendorID anedi query-params nunchi vastundi
      - query-params antey endpoint(all-vendors) from Url(localhost:4000/vendor/all-vendors)
      - req.params.id - e id ni Ah Route(all-vendors) loki dymanic pass chestunam
     
      - try {
         - vendor id ni - Get chestunam, Vendor Model nunchi 
         - every individual vendor ki unique id undi, adi Vendor Model table lo undi
         - "const vendor = await Vendor.findById(vendorId);"
         - Vendor - Vendor Model table lo
         - findById(vendorId) - findById method tho mana "vendorId" ni find cheshi - "vendor" ane variable ki assign chestunam

         - Incase, if our "vendorId" is not found - ade "vendor" ki assign chesham ga
         - "if(!vendor){
           - return res.status(404).json({error:"Vendor not found"});
         - }"
        
         - "res.status(200).json({vendor});"
         - vendor details JSON format lo respone vastadi

       - } catch (error) {
        - "console.log(error);"
        - "res.status(500).json({error:"Internal server error"});"
       - }"
     - }"
    - Export this function & Create a route
    - "module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById};"
    - vendorRoutes.js - create a route
    - "router.get('/single-vendor/:id', vendorController.getVendorById);"
    -  e id - getVendorById function lo - "const vendorId = req.params.id;"
    - We can write any word instead of id -"const vendorId = req.params.id;" -('/single-vendor/:apple')
    - Browser lo test chestey - vendor details vastai
    - Browser lo without ':' type cheyali - "localhost:4000/vendor/single-vendor/id" - id=._id (Database lo unde vendor oka ._id value)
    - vendor ki firm untey,firm - id values lo visible ithadi, firm record values kuda visible avali antey - getVendorById function lo populate method lo firm ni pass cheyali
    - "const vendor = await Vendor.findById(vendorId).populate('firm');"

- Products
  - Products are created same as, How we are added properties to Vendor & firm and created a relation b/w firm and vendors
  - Here, Products relation-direct ga Firm to untadi, Firm relation-direct ga Vendor to untadi - Products-Vendor indirect relation hashed_ga_untadi
  - Same process - Models, Controllers, Routes create cheshi , Products ki APIs create cheyali
   
- Products Model - Product.js - model folder
  - Create a Product.js file in models
   - const mongoose = require('mongoose');
   - Define Properties for Products
   - const productSchema = new mongoose.Schema({
    - productName: {
       - type:String,
       - required:true
      - },
    - price:{
       - type:String,
       - required:true
      - },
    - category:{
       - type:[
           - {
             -   type:String,
             -   enum:['Veg', 'Non-Veg']
           - }
       - ]
     - },
    - // Multiple Values ki - properties ela rayali(array lo rayali)
    - image:{
      - type:String
     - },
    - bestSeller:{
      -  type:String
     - },
    - description:{
      -  type:String
     - },
    - //Relation
    - firm:[{
      -  type: mongoose.Schema.Types.ObjectId,
      -  ref:'Firm' 
     - }],
    -  // e command & reference to - firm table to e product table ni relate chesham
    -  //Product Model create chesham, relation kuda echam, a relation firm lo kuda add cheyali
    - In firm.js - firmSchema property lo product relation add cheyali
      - product:[
          -  {
            -    type: mongoose.Schema.Types.ObjectId,
            -    ref:'Product'
           - }
         - ]
     
   - });

  - const Product = mongoose.model('Product',productSchema);
  - module.exports = Product;

- Create a productController.js file
- Create a productRoutes.js file
- index.js
  - Add productRoutes & create a middleware
  - "const productRoutes = require('./routes/productRoutes');"
  - "app.use('/product',productRoutes);"
  
