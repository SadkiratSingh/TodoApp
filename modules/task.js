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
    },
});

const Task = model('Task',taskSchema);

module.exports = {
    taskSchema : taskSchema,
    Task : Task
}