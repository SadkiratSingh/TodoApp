const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const taskSchema = new Schema({
    name:{
        type:Schema.Types.String,

        //validators
        minLength:10,
        maxLength:150,
        required:true
    },

    deadline:{
        type:Schema.Types.Date,

        //validators
        required:true,
        validate:{
            validator:function(date){
                let currentDate = new Date().getTime();
                let newDate = new Date(date).getTime();
                return newDate-currentDate>0;
            },
            message:"Please enter a valid time",
        }
    },
});

const Task = model('Task',taskSchema);

module.exports = {
    taskSchema : taskSchema,
    Task : Task
}