const express = require('express')
const router = express.Router()


router.post('/foodData', (req, res)=>{
    try{

        console.log(global.foodCategory);
 
        res.send([global.food_items, global.foodCategory]);
        

    }
    catch(error){
        console.log('Error' + error.message);
        res.send("server error");

    }
})
module.exports = router;