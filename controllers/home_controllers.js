const ctgModel = require('../modules/category').ctgModel

function home(req,res){
    ctgModel.find({},function(err,categories){
        if(err) return console.log(err);
        return res.render('home',{
            'categories':categories,
        });
    })
}

module.exports={
    home:home
}