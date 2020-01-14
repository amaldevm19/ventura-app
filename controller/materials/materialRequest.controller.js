const {MaterialRequests, MaterialRequestsArray} = require('../../model/materials/materialRequest.model');
exports.getAllMaterialRequest = function (req, res, next) {

    let title = "Material Requests";
    let pageHeading = "All Material Request";
    let materialRequest = true;
    let pageData = {
        title,
        pageHeading,
        userFirstName : req.session.user.firstName
        
    }
    MaterialRequests.find({},(err,data)=>{
        if(err){
            next(err);
        }
        pageData.material_requests = data;
       
        res.render('./materials/material-requests', {pageData, materialRequestPage:true});
    })
    
};
exports.newMaterialRequestPage = function (req, res, next) {
    if(!req.params.reqNumber){
    let title = "Material Requests";
    let pageHeading = "Create your request";
    let pageData = {
        title,
        pageHeading
    }
   
    MaterialRequests.estimatedDocumentCount((err, count)=>{

    let _material_request_number = count+1;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    date = day +"-"+month+"-"+year;
    let newRequest = new MaterialRequests({
        material_requests:[],
        material_request_number:_material_request_number,
        material_request_status:"Open",
        material_requester:req.session.user.firstName,
        created_at:date
    });

    newRequest.save((err)=>{
        if(err){
           next(err); 
        }else{
        MaterialRequests.findOne({material_request_number:_material_request_number},(err,data)=>{
            if(err){
                next(err); 
             }
             console.log(data);
             pageData.isAdmin = req.session.user.isAdmin;
             pageData.material_request_number = data.material_request_number;
             pageData.material_request_status = data.material_request_status;
             pageData.material_requester = data.material_requester;
             pageData.created_at = data.created_at;
             pageData.material_requests = data.material_requests;
            res.render('./materials/material-requests-page', {pageData, materialRequestPage:true});
        })  
    } 
    }) 
    });  
}
};
exports.editExistingMaterialRequestPage = function (req, res, next) {
    if(req.params.reqNumber){
    let title = "Material Requests";
    let pageHeading = "Create your request";
    let pageData = {
        title,
        pageHeading
    }
    let reqNum = Number(req.params.reqNumber);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    date = day +"-"+month+"-"+year;
    
    MaterialRequests.findOne({material_request_number:reqNum},(err, data)=>{
            if(err){
                next(err);
            }
            let newReq = {
                material_request_number:data.material_requests.length+1,
                material_model:req.body.material_model,
                material_qty:req.body.material_qty,
                material_request_status:"Open",
                created_at    : date
            }
            data.material_requests.push(newReq);
            pageData.isAdmin = req.session.user.isAdmin;
            pageData.material_request_number = data.material_request_number;
            pageData.material_request_status = data.material_request_status;
            pageData.material_requester = data.material_requester;
            pageData.created_at = data.created_at;
            pageData.material_requests = data.material_requests;
            data.save((err)=>{
                if(err){
                    next(err);
                }
                res.render('./materials/material-requests-page', {pageData, materialRequestPage:true});
            })
         
    });
  }
};

exports.getRequestForEditing = function (req, res, next) {
    if(req.params.reqNumber){
        let title = "Material Requests";
        let pageHeading = "Create your request";
        let pageData = {
            title,
            pageHeading
        }
  
    MaterialRequests.findOne({material_request_number:req.params.reqNumber},(err, data)=>{
            if(err){
                next(err);
            }
            pageData.isAdmin = req.session.user.isAdmin;
            pageData.material_request_number = data.material_request_number;
            pageData.material_request_status = data.material_request_status;
            pageData.material_requester = data.material_requester;
            pageData.created_at = data.created_at;
            pageData.material_requests = data.material_requests;
            res.render('./materials/material-requests-page', {pageData, materialRequestPage:true});
         
    });
  }
};

exports.deleteRequest = function(req,res,next){
    if(req.query.req){
        MaterialRequests.findOne({material_request_number:req.query.master},(err, data)=>{
            if(err){
                next(err)
            }

            data.material_requests.forEach((item,index,arr)=>{
                if(item.material_request_number == req.query.req){
                    arr.splice(index,1);
                }
            })
            data.save((err)=>{
                res.redirect(`/materials/material-request-edit/${req.query.master}`)
            })
        })
    }
}

exports.deleteMasterRequest = function(req,res,next){
    if(req.params.reqNumber){
        MaterialRequests.findOneAndDelete({material_request_number:req.params.reqNumber},(err, data)=>{
            if(err){
                next(err)
            }
            res.redirect(`/materials/material-request`)
        })
    }
}
exports.changeRequestStatus = function(req,res,next){
    if(!req.query.req){
        MaterialRequests.findOne({material_request_number:req.query.reqNumber},(err, data)=>{
            if(err){
                next(err)
            }
            data.material_request_status = req.query.status;
            data.save((err)=>{
                if(err){
                    next(err)
                }
                            
                res.redirect(`/materials/material-request`);
            })
        
        })
    }else{
        MaterialRequests.findOne({material_request_number:req.query.reqNumber,'material_requests.material_request_number':req.query.req },(err, data)=>{
            if(err){
                next(err)
            }
            let index = req.query.req-1;
            console.log(data.material_requests[index])
            data.material_requests[index].material_request_status = req.query.status;
            data.save((err)=>{
                if(err){
                    next(err)
                }
                            
                res.redirect(`/materials/material-request-edit/${req.query.reqNumber}`);
            })
        
        })
    }

}


