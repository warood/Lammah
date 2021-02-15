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

    appointment: [{type: mongoose.Schema.Types.ObjectId, ref: 'appointment'}],

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    rating: [{type: mongoose.Schema.Types.ObjectId, ref: 'rating'}],
    status : {
        type: Number,
        default :0 , 
       
    } , 

} , {timestamps :true})


const Facility = mongoose.model('facility' , facilitySchema)
module.exports = Facility
