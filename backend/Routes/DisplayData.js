const express = require('express')
const router = express.Router()
const order = require('../models/Orders');

function isMatched() {
    const currentDate = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const formattedDate = `${days[currentDate.getDay()]} ${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`;
    return formattedDate
}

router.post('/foodData', (req, res) => {
    try {

        console.log(global.foodCategory);

        res.send([global.food_items, global.foodCategory]);


    }
    catch (error) {
        console.log('Error' + error.message);
        res.send("server error");

    }
})

//for qrcode 
router.post('/displayOrders', async (req, res) => {

    try {
        let myData = await order.findOne({ '_id': req.body.id })
        let loadedOrders = []
        console.log(myData)
        console.log(req.body.id)

        if (!myData || !myData.order_data) {
            console.log("error")
            return res.status(404).json(null);
        } else {
            function extractItems(item, loadedOrders, data) {
                for (let i = 1; i < item.length; i++) {
                    const innerItem = item[i];
                    loadedOrders.push({
                        Order_date: data.Order_date,
                        name: innerItem.name,
                        price: innerItem.price,
                        qty: innerItem.qty,
                        size: innerItem.size,
                        status: data.status,
                    });
                }
            }
            
            myData.order_data.forEach((item) => {
                item.forEach((data, ind) => {
                    if (ind === 0 && data.Order_date === isMatched() && data.status === "Pending") {
                        console.log("Hello")
                        extractItems(item, loadedOrders, data);
                    }
                });
            });
            

            console.log(loadedOrders)

            res.json(loadedOrders)
        }
    }
    catch (error) {
        console.log('Error' + error.message);
        res.send("server error");

    }
})

router.post('/orderEmail', async (req, res) => {
    try {
        console.log(global.order_data);

        res.send([global.order_data]);

    }
    catch (error) {
        console.log('Error' + error.message);
        res.send("server error");

    }
})

router.post('/updateStatus', async (req, res)=> {
    try{
        let myData = await order.findOne({ '_id': req.body.id })

        for (let i = 0; i < myData.order_data.length; i++) {
                let data = myData.order_data[i][0];
                
                if (data.Order_date === isMatched() && data.status === "Pending") {
                    console.log(isMatched())
                    let status = req.body.status;
                    // const filter = { _id: req.body.id, 'order_data.0.Order_date' : isMatched(), 'order_data.0.status' : "Pending"};
                    // const update = { $set: { "order_data.0.$.status": "Received" } };
                    const filter = {
                        _id: req.body.id,
                        [`order_data.${i}.0.Order_date`]: isMatched(),
                        [`order_data.${i}.0.status`]: 'Pending'
                      };
                      
                      const update = {
                        $set: {
                          [`order_data.${i}.0.status`]: 'Received'
                        }
                      };
                      
                      const options = {
                        arrayFilters: [
                          { [`elem.Order_date`]: isMatched(), [`elem.status`]: 'Pending' }
                        ]
                      };
                    const result = await order.updateOne(
                        filter,
                        update,
                        options
                    )
                    console.log(result)
                    return res.send({ status: data.status });
                }
        }
    }catch(err){
        console.log('Error' + err.message)
        res.send("Server error")
    }
})

router.post('/displayusers', (req, res)=>{
    try{
        console.log(global.user_data);
        res.send([global.user_data]);
    }
    catch(error){
        console.log('Error' + error.message);
        res.send("server error");
    }
})

router.post('/displayOrdersHistory', async (req, res)=>{
    try{
        console.log(global.order_data);
        res.send([global.order_data]);
    }
    catch(error){
        console.log('Error' + error.message);
        res.send("server error");

    }
})

module.exports = router;