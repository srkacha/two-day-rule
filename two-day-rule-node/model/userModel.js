const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    authKey:{
        type: String,
        required: true
    },
    active:{
        type:Boolean,
        required: true,
        default: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('myprivatekey'));
    return token;
}

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit){
    User.find(callback).limit(limit);
}