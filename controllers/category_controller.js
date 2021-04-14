const {ctgSchema,ctgModel} = require('../modules/category');

function home(req,res){
    res.render('categoryhome');
}

function create(req,res){
    let name = req.query.name;
    let category = new ctgModel({name:name});

    //save takes care to call validate fxn on the created document.
    category.save(function(err){
        if(err) console.log(err);
        return res.redirect('/category');
    })
}

module.exports={
    home:home,
    create:create
}