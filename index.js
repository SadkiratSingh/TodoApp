const express=require("express");
require('./config/mongoose');
const app=express();
const port=8000;

//application level middleware

//MW1
app.use(express.static('./assets'));
//MW2
app.get('/',function(req,res){
    res.render('home')
})



app.listen(port,function(err){
    if (err) return console.log("Error in setting up the server!!");
    return console.log("Server is up and running on port "+port);
})