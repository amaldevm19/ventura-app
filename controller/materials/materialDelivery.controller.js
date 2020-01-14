const {MaterialRequests} = require('../../model/materials/materialRequest.model');

exports.getAllDeliveryOrder = function (req, res) {

    let title = "Material delivery";
    let pageHeading = "All material delivery status";
    let pageData = {
        title,
        pageHeading,
        
    }
    pageData.isAdmin = req.session.user.isAdmin;
    MaterialRequests.find({add_to_delivery:true},(err,data)=>{
        if(err){
            next(err)
        }
        console.log(data);
        res.render('./materials/material-delivery', {pageData,data, materialDeliveryPage:true});
    })
    
};

exports.addToDelivery = function (req, res, next){
    MaterialRequests.findOne({material_request_number:req.params.reqNumber},(err, data)=>{
        data.add_to_delivery = true;
        data.material_request_status = "Delivery"
        data.material_delivery_status = "Pending";
        data.save((err)=>{
            res.redirect('/materials/delivery-order');

        })
        
    })
}

exports.editDeliveryStatus = function(req, res){

    MaterialRequests.findOne({material_request_number:req.query.reqNumber},(err, data)=>{
        data.material_delivery_status = req.query.status;
        data.save((err)=>{
            if(err){
                next(err)
            }
            res.redirect('/materials/delivery-order');
        })
    })


}
