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
    
    facility: {type: mongoose.Schema.Types.ObjectId, ref: 'facility'},


} , {timestamps :true})


const User = mongoose.model('user' , userSchema)
module.exports = User
