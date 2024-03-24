const mongoose =require('mongoose');
const dataSchema =new mongoose.Schema(
{
    lastname:{
        type:String,
        required:'lastname is required!'
    },
    
    firstname:{
        type:String,
        required:'firstname is required!'
    },
    
    phone:{
        type:String,
        required:'phone is required!'
    },
    
    email:{
        type:String,
        required:'email is required!'
    },
    
    password:{
        type:String,
        required:'password is required!'
    },

    confirmpass:{
        type:String,
        required:'confirmpass is required!'
    },
}
);
module.exports = mongoose.model("User",dataSchema);