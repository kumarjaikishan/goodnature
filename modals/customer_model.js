const mongo = require('mongoose');

const Customer = new mongo.Schema({
    promotor:{
        type:mongo.Schema.Types.ObjectId,
        ref:'promotor',
    },
    name:{
        type:String,
        required:true
    },
    cust_id:{
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
const customer = new mongo.model("customer",Customer);
module.exports=customer;