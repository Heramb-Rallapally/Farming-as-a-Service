const mongoose=require('mongoose');

const {Schema}=mongoose;

const FarmerDetailsSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{ 
        type:String,
        required:true,
        unique:true,
    }
});
module.exports = mongoose.model('Farmer_details', FarmerDetailsSchema);