var mongoose = require('mongoose');

var habitSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    dateStarted:{
        type: Date,
        required: true,
        default: Date.now
    },
    active:{
        type: Boolean,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

var Habit = module.exports = mongoose.model('habit', habitSchema);

module.exports.get = function (callback, limit){
    Habit.find(callback).limit(limit);
}