const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MaterialRequestsArraySchema = new Schema ({
    material_request_number:{type:Number},
    material_model:{type:String},
    material_qty:{type:String},
    material_request_status:{type:String},
    created_at    : { type: String}
});
const MaterialRequestsArray = mongoose.model("material",MaterialRequestsArraySchema);

let MaterialRequestsSchema = new Schema ({
material_requests:[MaterialRequestsArraySchema],
material_request_number:{type:Number},
material_request_status:{type:String},
material_requester:{type:String},
add_to_delivery:{type:Boolean, default:false},
material_delivery_status:{type:String},
created_at    : { type: String}

});
const MaterialRequests = mongoose.model('MaterialsRequest', MaterialRequestsSchema);

module.exports = {
    MaterialRequests,
    MaterialRequestsArray
}