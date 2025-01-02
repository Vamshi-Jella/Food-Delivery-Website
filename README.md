# Food-Delivery-Website
- First install node to our project
  - npm init -y
- Then install required packages modulus (Dependencies) 
  - Express , Mongoose, Dotenv, Body-parser, Nodemon  
  - After install they can be seen in package.json - "dependencies"
  - npm install express mongoose dotenv body-parser nodemon

- To run the project , we have to define commands in two phases( Development & Deployment) in package.json -"scripts"
  - For Development phase - "dev": "nodemon run dev"
  - For Deployment phase - "start": "index" - where index file is gateway file which we generate output
  - npm run dev - Project will get excuted and shows output
  - nodemon vala file ni save chestey automatic ga changes update iyi output vastadi

- Create Server and Route
- Connecting with Database (MongoDB)
  - Go to the MongoDb site & signup
  - Create a new project - name it - click on create
  - Select cluster (free cluster) - click on create deployment
  - Then give a password & create database user
  - Remove old IP address & set IP address to 0.0.0.0 - so that we can access from anywhere
  - Go the Overview Cluster - click on "Connect - Drivers" - then copy MongoURL
  - Create a file - ".env"- store our MongoURL to a varaible
  - .env file lo MONGO_URI="link<our_databaseuser_password>/Project_Name?" 
  - Replace <password>=our DataUser password
  - Write our Project Name in "mongodb.net/PROJECTNAME?retry"
  - .env file lo unnavi access cheyali antey 
  - dotEnv.config()
  - write " process.env.Variable " whereever it required
  - Mongoose ni require cheshi MongoDb connect cheyali antey
  - const mongoose= require("mongoose");
  - mongoose.connect(process.env.MONGO_URI)
  - .then(()=>console.log("MongoDB connected successfully!"))
  - .catch((error)=>console.log(error))

- Vendor Registration
- Creating models
  -  Each vendor ki authentication echi products add chesukovachu
  - Vendor ki unique Authentication kosam username, email password estam
  - vendorSchema properties to eni records iyina create cheyachu -- avi tables lo save cheyaniki Controllers & Routes kavali