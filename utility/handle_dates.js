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

function calcLastDateAndTime(lastDate){
    let localDateString = lastDate.toLocaleString();
    return localDateString.split(",");
}

module.exports={
    calcDaysLeftUtil:calcDaysLeftUtil,
    convertIST:convertIST,
    calcDaysLeft: calcDaysLeft,
    pastDeadline:pastDeadline,
    calcLastDateAndTime:calcLastDateAndTime
}