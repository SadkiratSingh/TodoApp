const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const categorySchema=new Schema({
    name:{
        type:Schema.Types.String,
        required:true,
    }
})

const Category = model('Category',categorySchema);

module.exports = {
    categorySchema : categorySchema ,
    Category : Category
}