const mongoose=require('mongoose');

const {Schema}=mongoose;

const FarmerProduceDetailsSchema=new Schema({
    farmerId:{
        type:Schema.Types.ObjectId,
        ref:'Farmer_details',
        required:true
    },
    cropType:{
        type:String,
        required:true
    },
    cropAmount:{ 
        type:Number,
        required:true,
    },
    costPrice:{
        type:Number,
        required:true,
    },
    sellPrice:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Farmer_produce_details', FarmerProduceDetailsSchema);