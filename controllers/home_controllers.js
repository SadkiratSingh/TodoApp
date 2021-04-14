const ctgModel = require('../modules/category').ctgModel
const oneDay = 24*60*60*1000;

//utility functions
function calcDaysLeftUtil(last,current){
    let milliLast = last.getTime();
    let milliCurrent = current.getTime();
    let milliLeft = milliLast - milliCurrent;
    return Math.round(milliLeft/oneDay);
}

function convertIST(utcDate){
    let localDateString = utcDate.toLocaleString();
    let date = new Date(localDateString);
    return date;
}

function calcDaysLeft(lastDate){
    let daysLeft = calcDaysLeftUtil(convertIST(lastDate),new Date());
    return daysLeft;
}

function pastDeadline(lastDate){
    let a = new Date().getTime();
    let b = convertIST(lastDate).getTime();
    return a > b;
}

function calcLastDate(lastDate){
    let localDateString = lastDate.toLocaleString();
    return localDateString.split(",")[0];
}

// for what to display
function home(req,res){
    let modelQuery = ctgModel.find().lean();
    modelQuery.exec(function(err,categories){
        if(err) return console.log(err);

        let allTasks=[];
        categories.forEach((doc)=>{
          allTasks=allTasks.concat(doc.tasks);
        });

        allTasks.forEach((task)=>{
            task.lastDate = calcLastDate(task.deadline);
            task.daysLeft = calcDaysLeft(task.deadline);
            if(task.daysLeft <= 7){
                task.warningMsg = "We are approaching the deadline";
            }
            if(pastDeadline(task.deadline)){
                task.expireMsg = "We are past the deadline";
            }
        });

        console.log(allTasks);
        return res.render('home',{
            'categories':categories,
            'alltasks': allTasks
        });
    });
}

module.exports={
    home:home
}