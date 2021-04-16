const ctgModel = require('../modules/category').ctgModel
const datefxns = require('../utility/handle_dates');



// for what to display
function home(req,res){
    if(req.query.category !== undefined){
        return res.redirect(`/task/${req.query.category}`);
    }
    let modelQuery = ctgModel.find();
    modelQuery.exec(function(err,categories){
        //console.log(categories.__proto__); //Array.Prototype
        if(err) return console.log(err);
        return res.render('home',{
            'categories':categories,
        });
    });
}

module.exports={
    home:home
}