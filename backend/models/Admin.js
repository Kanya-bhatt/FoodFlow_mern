const mongoose = require('mongoose');
const { Schema } = mongoose;                  //destructing in javascript

const AdminSchema = new Schema({

    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },

    date : {
        type : Date,
        default : Date.now,

    },

});

module.exports = mongoose.model('admin', AdminSchema);