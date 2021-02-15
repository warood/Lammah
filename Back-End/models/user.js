const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    email : {
        type :String , 
        required :true ,
    },
    password : {
        type :String , 
        required :true
    } , 
    name : {
        type :String , 
        required :true
    },
    
    phone : {
        type :String , 
        required :true
    },

    type : {
        type :String , 
        
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },

} , {timestamps :true})


const User = mongoose.model('user' , userSchema)
module.exports = User
