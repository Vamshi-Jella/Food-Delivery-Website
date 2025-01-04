const express= require("express"); 
const dotEnv= require('dotenv');
const mongoose=require('mongoose');  

const app = express();

const PORT=4000;

dotEnv.config() 

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully!"))
.catch((error)=>console.log(error))


app.listen(PORT,()=>{
    console.log(`Server started & running at ${PORT}`);
});


app.use('/home',(req,res)=>{
    res.send("<h1> Welcome");
});

