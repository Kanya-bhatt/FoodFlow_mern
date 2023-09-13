const mongoose = require('mongoose');
const { Schema } = mongoose;                  //destructing in javascript

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model('order', OrderSchema);//model - Schema ko insert kaise karana hai 