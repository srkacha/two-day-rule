var mongoose = require('mongoose');

var progressSchema = mongoose.Schema({
    habitId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    comment:{
        type: String,
        required: false
    }
});

var Progress = module.exports = mongoose.model('progress', progressSchema);

module.exports.get = function (callback, limit){
    Progress.find(callback).limit(limit);
}