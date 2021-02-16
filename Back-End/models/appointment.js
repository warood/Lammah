const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({
    date : {
        type :String , 
        required :true ,
    },
    status : {
        type :String , 
        default:"inactive"
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }, 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    
    facility :{type : mongoose.Schema.Types.ObjectId , ref : 'facility' }


} , {timestamps :true})


const Appointment = mongoose.model('appointment' , appointmentSchema)
module.exports = Appointment
