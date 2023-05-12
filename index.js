import express from "express";
import * as url from "url";
import connectToDB from './lib/mongoDB.js';
import authRoute from './routes/auth.js'
import orderRoute from './routes/order.js'
// import multer from "multer";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log('\n\t>Starting DesignMyWear...');
// make db connection 
connectToDB();
const app = global.app = express();
const PORT = 6969;

// App settings
app.use(express.static(__dirname + '/frontEnd/public')); // serving static files
app.use(express.urlencoded({ extended: true })); // getting URL encodings
app.use(express.json());   
//app.use(multer().array());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);

// 404 handler
app.use('*',(req, res, next) => {
    res.send("Welcome to DesignMyWear");
});

app.listen(PORT, () => {
    console.log(`\n\tDesignMyWear running on : localhost:${PORT}`);
})