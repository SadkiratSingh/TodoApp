const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const categoryReq = require('./modules/category');

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
        required:true
    },

    category:categoryReq.categorySchema
});

const Task = model('Task',taskSchema);

module.exports = Task;