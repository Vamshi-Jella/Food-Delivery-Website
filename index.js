// Creating Server
const express= require("express"); 
// Manam install cheshi express ni import chesukoniki - require("express")
const app = express();
// express nunchi vastuna methods ani e app variable ki assign chestam
const PORT=4000;

app.listen(PORT,()=>{
    console.log(`Server started & running at ${PORT}`);
});

// By using above server we are defining route
app.use('/home',(req,res)=>{
    res.send("<h1> Welcome");
})

app.use('/admin',(req,res)=>{
    res.send("<h1> Welcome to Admin Page");
})

app.use('/login',(req,res)=>{
    res.send("<h1> login page ");
})
app.use('/menu',(req,res)=>{
    res.send("<h1> Welcome to menu page ");
})