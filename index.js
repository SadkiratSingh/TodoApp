// all requires
const express = require("express");
require('./config/mongoose');
const router = require('./routes');
const expressLayouts = require('express-ejs-layouts');
// all requires

const app = express();

// app settings and port
const port=8000;
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//application level middleware

//MW0
app.use(express.urlencoded());
//MW1
app.use(express.static('./assets'));

//MW2
app.use(expressLayouts); // to tell the render that that views it will fetch are bounded to some layout. This step needs to be done before rendering any view.

//MW3
app.use(router);



app.listen(port,function(err){
    if (err) return console.log("Error in setting up the server!!");

    return console.log("Server is up and running on port "+port);
})