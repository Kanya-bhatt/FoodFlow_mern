const express = require('express')
const router = express.Router()
const order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await order.findOne({ 'email': req.body.email })
    // console.log("Hello"  + eId)
    if (eId == null) {//if true this is first ever order of user
        try {
            await order.create({
                email : req.body.email,
                order_data : [data]
            }).then(() => {
                res.json({success : true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Error", error.message)
        }
    }
    else {      //find based upon email and push is complusary bcox if we dont write then it will replace the current order rather than appending
        try {
            await order.findOneAndUpdate({ email: req.body.email },     
                { $push: { order_data: data } }).then(() => {   
                    res.json({ success: true })
                })
        }
        catch (error) {
            res.send("server error", error.message)
        }
    }
});

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await order.findOne({'email' : req.body.email})
        res.json({orderData : myData})
    }catch(error){
        res.send("server error", error.message)
    }
})

module.exports = router;