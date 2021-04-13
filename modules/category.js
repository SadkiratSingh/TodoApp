const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const categorySchema=new Schema({
    name:{
        type:Schema.Types.String,

        //validation
        required:true,
        minLength:3,
        maxLength:200
    }
})

const Category = model('Category',categorySchema);

module.exports = {
    ctgSchema : categorySchema ,
    ctgModel : Category
}