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
                message:'New habit added successfuly.',
                data: newHabit
            });
        }
    });
}

//Get habits for userId
exports.getAllForUserId = function(req, res){
    Habit.find({userId: req.params.userId, active: true}, function(err, habits){
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

//Update habit for habitId, updating possible on name and description
exports.update = function(req, res){
    Habit.findById(req.params.habitId, function(err, habit){
        if(err){
            res.json(err);
        }else if(habit === null){
            res.json({
                status:'error',
                message:'Habit with the given ID does not exist.'
            });
        }else{
            habit.name = req.body.name;
            habit.description = req.body.description;
            habit.save(function(err){
                if(err){
                    res.json(err);
                }else{
                    res.json({
                        status:'success',
                        message:'Habit data updated successfuly.',
                        data: habit
                    });
                }
            });
        }
    });
}

//Deactivating the existing habit
exports.delete = function(req, res){
    Habit.findById(req.params.habitId, function(err, habit){
        if(err){
            res.json(err);
        }else{
            habit.active = false;
            habit.save(function(err){
                if(err){
                    res.json(err);
                }else{
                    res.json({
                        status:'success',
                        message: 'Habit removed succesfully.'
                    })
                }
            });
        }
    });
}