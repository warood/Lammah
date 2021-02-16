const mongoose = require('mongoose')


const ratingSchema = new mongoose.Schema({
    comment : {
        type :String , 
    },
    stars : {
        type :Number , 
        required :true
    } , 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    facility :{type : mongoose.Schema.Types.ObjectId , ref : 'facility' }
    
} , {timestamps :true})



const Rating = mongoose.model('rating' , ratingSchema)
module.exports = Rating;
