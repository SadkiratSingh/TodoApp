const ctgModel = require('../modules/category').ctgModel
const datefxns = require('../utility/handle_dates');
const mongoose = require('mongoose');


// for what to display
function home(req,res){
    let modelQuery = ctgModel.find();
    modelQuery.exec(function(err,categories){
        if(err) return console.log(err);

        let taskDocs=[];
        categories.forEach((doc)=>{
          taskDocs=taskDocs.concat(doc.tasks);
        });
        let taskObjects=taskDocs.map((task)=>{
            let parent = task.parent();
            task = task.toObject();
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
        console.log(taskObjects);
        return res.render('home',{
            'categories':categories,
            'tasks': taskObjects 
        });
    });
}

module.exports={
    home:home
}