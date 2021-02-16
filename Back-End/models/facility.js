const mongoose = require('mongoose')



const facilitySchema = new mongoose.Schema({
    name : {
        type :String , 
        required :true ,
    },
    images :  [String]
        ,
     
    location : {
        type:Object , 
       
    } , 
    description : {
        type :String , 
        
    } , 
    
    city : {
        type :String , 
       
    } , 
    price : {
        type :Number , 
      
    } , 
    type : {
        type :String , 
       
    } , 

    views : {
        type :Number , 
        default: 0,
       
    } , 
    stars : {
        type :Number , 
        default: 0,
       
    } , 

    appointment: [{type: mongoose.Schema.Types.ObjectId, ref: 'appointment'}],

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    status : {
        type: Number,
        default :0 , 
       
    } , 

} , {timestamps :true})


const Facility = mongoose.model('facility' , facilitySchema)
module.exports = Facility
