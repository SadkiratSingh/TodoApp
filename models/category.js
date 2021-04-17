const mongoose = require('mongoose');
const taskSchema = require('./task').taskSchema;
const {Schema,model} = mongoose;


const categorySchema=new Schema({
    name:{
        type:Schema.Types.String,

        //validation
        required:true,
        minLength:3,
        maxLength:200,

        //indexes
        unique:true,
    },
    
    // constructing mongoose document arrays
    tasks:[taskSchema],
})

const Category = model('Category',categorySchema);

module.exports = {
    ctgSchema : categorySchema ,
    ctgModel : Category
}