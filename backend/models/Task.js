const mongoose = require("mongoose");
const { type } = require("os");
const { MAX_LENGTH } = require("picomatch/lib/constants");


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please add task'],
        trim:true,
        maxlength: 100
    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('TASK',TaskSchema);
