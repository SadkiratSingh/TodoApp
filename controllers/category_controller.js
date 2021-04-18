const {ctgModel} = require('../models/category');

function home(req,res){
    ctgModel.find({},function(err,ctgList){
        if(err) return console.log("Error in retrieving documents")
        return res.render('categoryhome',{
            'categorylist':ctgList
        });
    })
    
}

function create(req,res){
    let name = req.query.name;
    let category = new ctgModel({name:name});

    //save takes care to call validate fxn on the created document.
    category.save(function(err){
        if(err) return res.redirect('back');
        return res.redirect('/category');
    })
}

function deleteCategory(req,res){
    let category = req.params.ctg;
    ctgModel.deleteOne({name:category},function(err,doc){
        if(err) return res.redirect('back');
        return res.redirect('back');
    })
}

function renameCategory(req,res){
    console.log(req.query);
    ctgModel.findOne({name:req.query.org},function(err,doc){
        //console.log(doc) incase no document is found mongodb sends a null
        if(err || doc===null) return res.redirect('back');
        doc.name = req.query.name;
        doc.save(function(err){
            if(err) return res.redirect('back');
            return res.redirect('back');
        });
    });
}

module.exports={
    home:home,
    create:create,
    deleteCategory:deleteCategory,
    renameCategory:renameCategory
}