const mongoose = require('mongoose')


const facilitySchema = new mongoose.Schema({
    name : {
        type :String , 
        required :true ,
    },
    images :  [String]
        ,
     
    location : {
        type :String , 
       
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
    

} , {timestamps :true})


const Facility = mongoose.model('facility' , facilitySchema)
module.exports = Facility
