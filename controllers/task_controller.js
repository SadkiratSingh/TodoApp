const {ctgModel} = require('../models/category');
const datefxns = require('../utility/handle_dates');

function create(req,res){
    /* create your task here */
    let taskName = req.body.name;
    let deadline = req.body.deadline;
    let categoryName = req.body.category;
    
    //findOne is used on mongoose Model. Its first argument is filter object.
    ctgModel.findOne({name:categoryName},function(err,ctgDoc){
        if(err || ctgDoc === null) return res.redirect('back');

        //console.log(ctgDoc instanceof mongoose.Document); //true;
        //console.log(ctgDoc instanceof mongoose.Model); //true
        //console.log(ctgDoc.tasks.isMongooseArray)

        //pushing an object to ctgDoc.tasks. This object represents our task containing the keys which represent fields on our schema for task.
        ctgDoc.tasks.push({name:taskName,deadline:deadline});

        // save takes care of validation and query casting
        ctgDoc.save(function(err){
            if(err) return res.redirect('back');
            return res.redirect('back');
        });
    });
}

function displayCategoryTasks(req,res){
    let categoryName = req.params.ctg;

    //findOne returns a Mongoose.Query instance. This time callback is not used.
    let query = ctgModel.findOne({name:categoryName});

    //exec executes the db query represented by query
    query.exec(function(err,ctgDoc){
        if(err || ctgDoc === null) return res.redirect('back');
        
        //map can be used on mongoose array
        let taskObjects=ctgDoc.tasks.map((task)=>{
            // here task is mongoose Document instance

            let parent = task.parent(); // accessing parent Document via child Document

            task = task.toObject(); // task converted to plain js object bcoz mongoose Document instance is freezed. We cant add properties to it

            /* start modifying the task document after converting to plain js object */
            task.category = parent.name; 
            
            // we can access any property on mongoose doc
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
            'category': ctgDoc.name
        });
    });
}

function taskDelete(req,res){
    /* This type of code was done in case of tasks of all categories displayed at once */
    /* helps us understand the significance of promises in javascript */

    // this statement works similar to 'in' operator in MySQL
    let query = ctgModel.find({name : {$in: Object.keys(req.body)}});

    query.exec(function(err,docs){
        if(err) return res.json({message:"Internal Server Error!!"});
        // docs is a plain js array contaning various mongoose Document instances from category collection

        let docPromises=docs.map(function(doc){
            // incase only single task is present in a particular category
            if(!Array.isArray(req.body[doc.name])){
                doc.tasks.id(req.body[doc.name]).remove();
            }
            else{
                for (let task_id of req.body[doc.name]){
                    doc.tasks.id(task_id).remove(); //finding the task document in mongoose array via its id and removing it
                }
            }
            return doc.save(); // saving a particular category coz its modified. save() also returns promise incase we dont use callback with it.
        })

        // docPromises is an array of unresolved promises generated from save corresponding every category.
        Promise.all(docPromises).then(
            results=>{
                if(results.length == 0){
                    res.json({message:"Please select an item!",changes:results.length});
                }
                else{
                    res.json({message:"Success!!"});
                }
            }
        ).catch(
            err=>{
                res.json({message:"Internal Server Error!!"});
            }
        )
    });
}

function taskUpdate(req,res){
    let taskName = req.body.name;
    let deadline = req.body.deadline;
    let categoryName = req.body.category;
    let taskId = req.body.id;

    ctgModel.findOne({name:categoryName},function(err,ctgDoc){
        if(err || ctgDoc === null) return res.redirect('back');

        let taskToUpdate = ctgDoc.tasks.id(taskId);
        taskToUpdate.name = taskName; // simply accessing and modifying properties on mongoose Document however we cant add new properties to document.
        taskToUpdate.deadline = deadline;
        ctgDoc.save(function(err){
            if(err) return res.redirect('back');
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