const mongo = require('mongoose');

const BookingSchema = new mongo.Schema({
    promotor:{
        type:mongo.Schema.Types.ObjectId,
        ref:'promotor',
    },
    customer:{
        type:mongo.Schema.Types.ObjectId,
        ref:'customer',
    },
    bookingno:{
        type:String,
        required:true
    },
    plotname:{
        type:String,
        required:true
    },
    plotvalue:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    emi:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }

})
const Booking = new mongo.model("booking",BookingSchema);
module.exports=Booking;