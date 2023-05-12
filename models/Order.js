import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    //personal details
    email :{
        type: String,
        required:true
    },
    fullname:{
        type: String,
        required:true
    },
    //contact details
    full_address:{
        type : String,
        required:true
    },
    zipcode:{
        type: Number,
        required:true
    },
    phone :{
        type: Number,
        required:true
    },
    // order deatils
    orderPic :{
        type : String, //path
    },
    order_data:{
        type : [],
    },
    order_dscp:{
        type : String,
    },
    status:{
        type : String,
        default : 'Processing'
    },
    status_dscp:{
        type : String,
        default : 'Your requested order is currently being processed, and will be treated as a request for now, we will surely contact you within few hours.'
    }
}, { timestamps:true })

const Order = mongoose.model('Order', orderSchema)
export default Order