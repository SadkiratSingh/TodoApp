const ctgModel = require('../modules/category').ctgModel;
const datefxns = require('../utility/handle_dates');

function create(req,res){
    /* create your task here */
    let task = req.body.name;
    let deadline = req.body.deadline;
    let category = req.body.category;
    console.log(deadline);

    ctgModel.findOne({name:category},function(err,ctgDoc){
        if(err) return console.log(err);

        ctgDoc.tasks.push({name:task,deadline:deadline});
        ctgDoc.save(function(err){
            if(err) return console.log(err)
            return res.redirect('/');
        });
    });
}

function displayCategoryTasks(req,res){
    let category = req.params.ctg;
    let modelQuery = ctgModel.findOne({name:category});
    modelQuery.exec(function(err,category){
        if(err) return console.log(err);
        
        //category.tasks is a mongoose array which is just an extended version of js array;
        //category is the mongoose document;

        let taskObjects=category.tasks.map((task)=>{
            let parent = task.parent();
            task = task.toObject(); // task.__proto__=== Object.prototype

            /* start modifying the task document after converting to simple js object */
            task.category = parent.name; 
            [task.lastDate,task.lastTime] = datefxns.calcLastDateAndTime(task.deadline);
            task.daysLeft = datefxns.calcDaysLeft(task.deadline);
            if(task.daysLeft <= 7 && !datefxns.pastDeadline(task.deadline)){
                task.warningMsg = "We are approaching the deadline";
            }
            else if(datefxns.pastDeadline(task.deadline)){
                task.expireMsg = "We are past the deadline";
            }
            return task;
        });
        return res.render('categorydisplay',{
            'tasks': taskObjects,
            'category': category.name
        });
    });
}

function taskDelete(req,res){
    let modelQuery = ctgModel.find({name : {$in: Object.keys(req.body)}});
    modelQuery.exec(function(err,docs){
        if(err) return res.json({message:"Internal Server Error!!"});
        let docPromises=docs.map(function(doc){
            if(!Array.isArray(req.body[doc.name])){
                doc.tasks.id(req.body[doc.name]).remove();
            }
            else{
                for (let task_id of req.body[doc.name]){
                    doc.tasks.id(task_id).remove();
                }
            }
            return doc.save();
        })
        Promise.all(docPromises).then(
            results=>{
                res.json({message:"Success!!"});
            }
        ).catch(
            err=>{
                res.json({message:"Internal Server Error!!"});
            }
        )
    })
}

function taskUpdate(req,res){
    let task = req.body.name;
    let deadline = req.body.deadline;
    let category = req.body.category;
    let taskId = req.body.id;

    ctgModel.findOne({name:category},function(err,ctgDoc){
        if(err) return console.log(err);

        let taskToUpdate = ctgDoc.tasks.id(taskId);
        taskToUpdate.name = task;
        taskToUpdate.deadline = deadline;
        ctgDoc.save(function(err){
            if(err) return console.log(err)
            return res.redirect('back');
        });
    });

}

module.exports={
    create:create,
    displayCategoryTasks:displayCategoryTasks,
    taskDelete:taskDelete,
    taskUpdate:taskUpdate
}