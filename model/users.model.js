const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

let UsersSchema = new Schema ({
    email:{type:String, required:true, index: { unique: true }},
    password:{type: String, required:true},
    firstName:{type: String, required:true},
    isAdmin:{type:Boolean},
    created_at    : { type: Date, required: true, default: Date.now }
})
UsersSchema.pre('save',function (next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,(err, salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})

UsersSchema.methods.comparePassword = function (candidatePassword, cb){
    bcrypt.compare(candidatePassword,this.password,function (err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    })
}

module.exports = mongoose.model('Users', UsersSchema);