const ctgModel = require('../modules/category').ctgModel;

function create(req,res){
    /* create your task here */
    let task = req.body.name;
    let deadline = req.body.deadline;
    let category = req.body.category;

    ctgModel.findOne({name:category},function(err,ctgDoc){
        if(err) return console.log(err);
        
        ctgDoc.tasks.push({name:task,deadline:deadline});
        ctgDoc.save(function(err){
            if(err) return console.log(err)
            console.log("Success!!");
        });
    });
}

module.exports={
    create:create,
}