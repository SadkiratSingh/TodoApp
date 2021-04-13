const express=require("express");
const app=express();
const port=8000;


app.listen(port,function(err){
    if (err) return console.log("Error in setting up the server!!");
    return console.log("Server is up and running on port "+port);
})