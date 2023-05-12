import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import fetchuser from '../middlewares/fetchuser.js'
import Order from '../models/Order.js'

const orderRoute = Router()

orderRoute.post('/newOrder', [
    //user personal details
    body('fullname', 'Please provide your full-name.').isLength({min:5}),
    body('email', 'Please provide a valid email.').isLength({min:10}).isEmail(),
    //contact details
    body('address', 'Please provide your postal complete address.').isLength({min:10}),
    body('zipcode', 'Please provide your postal code.').isLength({min:6}),
    body('phone', 'Please provide your contact number.').isLength({min:10}),
    //order details
    body('order','Order can not be empty').isObject()
], async (req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({success:false, error: errors.array()})
        }
        let { fullname, email, address, zipcode, phone, order } = req.body

        let orderData = {
            //personal details
            email : email,
            fullname : fullname,
            //contact details
            full_address : address,
            zipcode : zipcode,
            phone : phone,
            // order deatils
            orderPic : order.orderPic,
            order_dscp : order.dscp,
            order_data : order.data
        }
        const newOrder = await Order.create(orderData)
        res.status(200).json({success:true, data:newOrder})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error : "Internal Server Error"});
    }
})

orderRoute.get('/getAllOrders', fetchuser, async (req,res)=>{
    try {
        const allOrders = await Order.find()
        if(allOrders){
            return res.status(200).json({success:true, data:allOrders, message:"New orders are here."})
        }else{
            return res.status(200).json({success:true, data:{}, message:'No Orders.'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error : "Internal Server Error"});
    }
})

orderRoute.get('/getOrderByID/:order_id', async (req, res)=>{
    try {
        var orderId = req.params.order_id;
        const order = await Order.findById(orderId);
        if(order){
            res.status(200).send({success:true, data:order});
        }else{
            res.status(200).send({success:true, data:{}, message:"No data found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error:"Internal Server Error"});
    }
})

export default orderRoute