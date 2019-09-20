var mongoose = require('mongoose');

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
    }
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit){
    User.find(callback).limit(limit);
}