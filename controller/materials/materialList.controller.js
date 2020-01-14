const {Material,MaterialCategory,MaterialBrand} = require('../../model/materials/materialList.model');

exports.getMaterial = function (req, res, next) {
    let title = "Materials";
    let pageHeading = "All materials";
    let materialTable = [];
    let limit = 15;
    let pageName = "";
    let categoryArray = [];
    let modelArray = [];
    let filterList = {};
    let filter_name_ = req.query.filter_name;
    let filter_cat = req.query.filter_cat;
    
    Material.find({},(err, data)=>{
        if(err){
            next(err);
        }
        if(filter_name_){
            filterd_doc = [];
            data.forEach((item)=>{
              if(item[filter_name_] == filter_cat){
                filterd_doc.push(item);
              }
              pageName="Back";
              limit = 100;
            })
            data = filterd_doc;
          }
          data.forEach((item, index, array)=>{
            categoryArray.push(item.material_category);
          })
          data.forEach((item, index, array)=>{
            modelArray.push(item.material_model);
          })
          filterList.category = [... new Set(categoryArray)];
          filterList.model = [... new Set(modelArray)];
        let pageCount = data.length > limit ? data.length/limit: 1;
        let pageArray = [];
        for(i=0; i<pageCount; i++){
            let pageName_ = (i+1);
            if(pageName != "Back"){
              pageArray.push((pageName_));
            }
          }
          if(req.query.page){
            let pageId = Number(req.query.page);
            materialTable = data.splice(((pageId-1)*limit),limit);
          }else{
            materialTable = data.splice(0,limit);
          }
        let pageData = {
            title,
            pageHeading,
            pageArray,
            pageName
        }
        res.render('./materials/material-list', {pageData, materialTable, filterList,pageName, materialListPage:true});
    })
   
};

exports.deleteMaterial = function (req, res, next) {
    let title = "Materials";
    let pageHeading = "All materials";
    let pageData = {
        title,
        pageHeading
    }
    Material.findOneAndDelete({material_model:req.params.material_model},(err, data)=>{
        if(err){
            next(err);
        }
        console.log("Success")
        Material.find({},(err, data)=>{
            if(err){
                next(err);
            }
            materialTable = data;
            res.redirect('/materials/material-list');
        })
    })
   
};

exports.addMaterial = function (req, res,next) {
    console.log(req.body);

    let newMaterial = new Material({
        material_model:req.body.materialModal,
        material_description:req.body.materialDescription,
        material_category:req.body.materialCategory,
        material_brand:req.body.materialBrand
    });
    newMaterial.save((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/materials/material-list-add');
    })
};

exports.addCategory = function (req, res,next) {
    if(req.body.categoryName){
        let newCategory = new MaterialCategory({
            material_category:req.body.categoryName
        });
        newCategory.save(function (err) {
            if (err) {
                return next(err);
            }
        res.redirect('/materials/material-list-add');
        })
    }
};
exports.addBrand = function (req, res,next) {
    if(req.body.addbrandName){
        console.log(req.body.addbrandName)
        let newBrand = new MaterialBrand({
            material_brand:req.body.addbrandName
        });
        newBrand.save(function (err) {
            console.log(err)
            if (err) {
                return next(err);
            }
        res.redirect('/materials/material-list-add');
        })
    }
};
exports.addMaterialPage = function (req, res,next) {
    let title = "Add material";
    let pageHeading = "Add new materials";
    let catAndbrand = {};
    let pageData = {
        title,
        pageHeading,
    }
    MaterialCategory.find({},(err, categoryData)=>{
        if(err){
        next(err);
        }
        MaterialBrand.find({},(err, brandData)=>{
            if(err){next(err)};
            catAndbrand.categoryArray = categoryData;
            catAndbrand.brandArray = brandData;
            res.render('./materials/material-list-add', {pageData,catAndbrand, materialListPage:true});
        })
    })    
};
exports.getMaterialforRequest = function (req,res,next){
    Material.find({},(err,data)=>{
        if(err){
            next(err)
        }
        res.send(data);
    })

}

