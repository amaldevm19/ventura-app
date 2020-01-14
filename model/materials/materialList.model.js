const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MaterialsSchema = new Schema ({
    //_id:{type:Number, required:true},
    material_category:{type:String, required:true},
    material_description:{type:String, required:true},
    material_brand:{type:String, required:true},
    material_model:{type:String, required:true, index: { unique: true }},
    created_at    : { type: Date, required: true, default: Date.now }
});

const Material = mongoose.model('MaterialList', MaterialsSchema);

let CategorySchema = new Schema ({
    material_category:{type:String, required:true, index: { unique: true }},
    created_at    : { type: Date, required: true, default: Date.now }
});

const MaterialCategory = mongoose.model('MaterialCategory', CategorySchema);
let BrandSchema = new Schema ({
    material_brand:{type:String, required:true, index: { unique: true }},
    created_at    : { type: Date, required: true, default: Date.now }
});

const MaterialBrand = mongoose.model('MaterialBrand', BrandSchema);
module.exports = {
    Material, 
    MaterialCategory,   
    MaterialBrand
}
