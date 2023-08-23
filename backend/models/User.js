const mongoose = require('mongoose');
const { Schema } = mongoose;                  //destructing in javascript

const UserSchema = new Schema({
    studentId : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    semester: {
        type : Number,
        required: true,

    },

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

module.exports = mongoose.model('user', UserSchema);//model - Schema ko insert kaise karana hai 
