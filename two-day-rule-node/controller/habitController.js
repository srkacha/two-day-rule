var Habit = require('../model/habitModel');

//Create new
exports.new = function(req,res){
    var newHabit = new Habit();
    newHabit.name = req.body.name;
    newHabit.description = req.body.description;
    newHabit.userId = req.body.userId;

    newHabit.save(function(err){
        if(err){
            res.json(err);
        }else{
            res.json({
                status:'success',
                message:'New habbit added successfuly.',
                data: newHabit
            });
        }
    });
}

//Get habits for userId
exports.getAllForUserId = function(req, res){
    Habit.find({userId: req.params.userId}, function(err, habits){
        if(err){
            res.json(err);
        }else{
            res.json({
                status:'success',
                message:'Habits fetched successfuly.',
                data: habits
            });
        }
    });
}