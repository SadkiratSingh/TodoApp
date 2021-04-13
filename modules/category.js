const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const categorySchema=new Schema({
    name:{
        type:Schema.Types.String,
        required:true,
    },
    assignedtasks:{
        type:Schema.Types.Number,
    }
})

const Category = model('Category',categorySchema);

module.exports = {
    categorySchema : categorySchema ,
    Category : Category
}