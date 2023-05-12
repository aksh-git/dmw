import mongoose, { Schema } from 'mongoose'

const adminSchema = new Schema({
    email : {
        type : String,
        unique: true,
        required : true
    },
    password :{
        type : String,
        required : true
    }
}, { timestamps:true })

const Admin = mongoose.model('Admin', adminSchema)
export default Admin