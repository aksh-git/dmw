import mongoose from 'mongoose';
import config from '../config.js';

let isConnected = false;

function connectToDatabase(){
    if(isConnected) return
    // settings
    mongoose.set('strictQuery', true);
    if(config.DEBUG) mongoose.set('debug', true);
    // making connection 
    mongoose.connect(config.MONGO_URI);

    mongoose.connection.on('connected', conn=>{
        isConnected = true;
        console.log("\n[DMW] Connected to MongoDB.\n");
    });
    // handling connection error
    mongoose.connection.on('error', err => {
        console.log("[MongoDB Connection ERROR]", err);
        isConnected=false;
    });
}

export default connectToDatabase;