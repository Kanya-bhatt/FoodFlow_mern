const express = require('express')
const router = express.Router()
const User = require('../models/Orders')

router.post('/myOrderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, {Order_data: req.body.order_data})

    let eId = await Order.findOne({'email' : req.body.email})
    console.log(eId)
    if(eId == null){//if true this is first ever order of user
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
}

else{
    try{
        await Order.findOneAndUpdate({email: req.body.email},
            {$push: {order_data: data}}).then(()=>{
                res.json({success: true})
            })
           

            }
            catch(error){
                res.send("server error", error.message)

            }
    }

    

});

module.exports = router;