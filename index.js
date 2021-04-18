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


//application level middleware

//MW0
app.use(express.urlencoded());
//MW1
app.use(express.static('./assets'));

//MW2
app.use(expressLayouts); // to tell the express that our views our bounded to some layout

//MW3
app.use(router);



app.listen(port,function(err){
    if (err) return console.log("Error in setting up the server!!");

    return console.log("Server is up and running on port "+port);
})