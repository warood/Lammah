const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({
    date : {
        type :String , 
        required :true ,
    },
    status : {
        type :String , 
        default:"inactive"
    } , 
    
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},



} , {timestamps :true})


const Appointment = mongoose.model('appointment' , appointmentSchema)
module.exports = Appointment
