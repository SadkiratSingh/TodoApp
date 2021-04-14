const {ctgSchema,ctgModel} = require('../modules/category');

function home(req,res){
    ctgModel.find({},function(err,ctgList){
        if(err) return console.log("Error in retrieving documents")
        res.render('categoryhome',{
            'categorylist':ctgList
        });
        return;
    })
    
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