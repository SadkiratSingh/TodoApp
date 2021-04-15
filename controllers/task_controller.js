const ctgModel = require('../modules/category').ctgModel;
const datefxns = require('../utility/handle_dates');

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
            task.lastDate = datefxns.calcLastDate(task.deadline);
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

module.exports={
    create:create,
    displayCategoryTasks:displayCategoryTasks
}