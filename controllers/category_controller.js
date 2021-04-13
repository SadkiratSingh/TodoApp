const {ctgSchema,ctgModel} = require('../modules/category');

function home(req,res){
    res.render('categoryhome');
}

function create(req,res){
    let name = req.query.name;
    console.log(name);
    let category = new ctgModel({name:name});
    console.log(category)
    category.save(function(err){
        if(err) return console.log(err);
        return console.log("Success!!")
    })
}

module.exports={
    home:home,
    create:create
}