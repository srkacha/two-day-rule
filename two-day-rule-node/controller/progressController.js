var Progress = require('../model/progressModel');

//New progress
exports.new = function(req,res){
    var newProgress = new Progress();
    newProgress.date = req.body.date;
    newProgress.habitId = req.body.habitId;
    newProgress.comment = req.body.comment?req.body.comment:'';
    newProgress.save(function(err){
        if(err){
            res.json(err);
        }else{
            res.json({
                status:'success',
                message:'Progress updated sucessfully',
                data: newProgress
            });
        }
    });
}

//Get all progress for habit ID
exports.getAllForHabitId = function(req,res){
    Progress.find({habitId: req.params.habitId}, function(err, progress){
        if(err){
            res.json(err);
        }else{
            res.json({
                status:'success',
                message:'Progress fetched succesfully.',
                data: progress
            });
        }
    });
}

//Delete progress
exports.delete = function(req, res){
    Progress.deleteOne({_id:req.params.progressId}, function(err){
        if(err){
            res.json(err);
        }else{
            res.json({
                status:'success',
                message:'Progress was deleted successfully.'
            });
        }
    });
}