const mongo = require('mongoose');

const pro = new mongo.Schema({
    senior:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true,
        unique: true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
const promoter = new mongo.model("promotor",pro);
module.exports=promoter;