var express = require('express');
var router = express.Router();
const {getAllDeliveryOrder, addToDelivery, editDeliveryStatus} = require('../controller/materials/materialDelivery.controller');
const {getMaterial, addMaterial, addMaterialPage,addBrand, addCategory, deleteMaterial, getMaterialforRequest} = require('../controller/materials/materialList.controller');
const {getAllMaterialRequest, newMaterialRequestPage,editExistingMaterialRequestPage, getRequestForEditing, deleteRequest, deleteMasterRequest,changeRequestStatus} = require('../controller/materials/materialRequest.controller');

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next(); 
  }else {
    res.redirect('/');     
  }    
};

router.get('/delivery-order',sessionChecker, getAllDeliveryOrder);
router.get('/material-list',sessionChecker, getMaterial);
router.get('/material-list-add',sessionChecker, addMaterialPage);
router.post('/material-list-add',sessionChecker, addMaterial);
router.get('/material-list-add/:material_model',sessionChecker, deleteMaterial);
router.post('/add-category',sessionChecker, addCategory);
router.post('/add-brand',sessionChecker, addBrand);
router.get('/material-request', sessionChecker, getAllMaterialRequest);
router.get('/material-request-add-new/', sessionChecker, newMaterialRequestPage);
router.post('/material-request-edit/:reqNumber', sessionChecker, editExistingMaterialRequestPage);
router.get('/material-request-edit/:reqNumber', sessionChecker,getRequestForEditing);
router.get('/material-request-delete', sessionChecker,deleteRequest);
router.get('/material-request-change-status', sessionChecker,changeRequestStatus);
router.get('/material-request-delete/:reqNumber', sessionChecker,deleteMasterRequest);
router.get('/material-request-add/get-all-material', sessionChecker, getMaterialforRequest);
router.get('/material-request-addto-delivery/:reqNumber', sessionChecker, addToDelivery);
router.get('/material-request-edit-delivery', sessionChecker, editDeliveryStatus);


module.exports = router;
