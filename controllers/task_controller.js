const ctgModel = require('../modules/category').ctgModel;

function create(req,res){
    ctgModel.find({},function(err,categories){
        if(err) return console.log(err);
        return res.render('home',{
            'categories':categories
        })
    })
}

module.exports={
    create:create,
}