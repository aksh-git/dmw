import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import config from '../config.js'
import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'

const authRoute = Router()
const JWT_SECRET = config.JWT_SECRET //SECRET

authRoute.post('/login', [
    body('email', 'Please provide a valid email.').isLength({min:10}).isEmail(),
    body('password', 'Please provode a valid password.').isLength({min:5}),
], async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({success:false, error: errors.array()})
        }
        const { email , password } = req.body
        let admin = await Admin.findOne({email:email})
        if(!admin){
            return res.status(400).json({success:false, error: "Please Login with correct credentials."});
        }
        const passComp = await bcrypt.compare(password, admin.password);
        if(!passComp){
            return res.status(400).json({success:false, error: "Please Login with correct credentials"});
        }
        const data = {
            user: {
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({success:true, authtoken:authtoken}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error : "Internal Server Error"});
    }
})

authRoute.get('/setup', async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(config.ADMIN.pass, salt);
        const uemail = config.ADMIN.email;
        
        let admin = await Admin.create({
            email: uemail,
            password : secPass
        })   
        if(admin){
            console.log('\n[DWM] New Admin created successfully');
            console.log(admin);
            res.status(200).json(admin);
        }else{
            console.log('\t[Error] Could not able to create new admin');
            res.send('[Error] Could not able to create new admin')
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error : "Internal Server Error"});
    }
})

export default authRoute