var User = require('../model/userModel');
var crypto = require('crypto');
var uuidv4 = require('uuid/v4');

//Get all
exports.index = function(req, res){
    User.get(function (err, users){
        if(err){
            res.json({
                status: 'error',
                message: 'Unable to fetch users at the time.'
            });
        }else{
            res.json({
                status: 'success',
                message: 'Users fetched successfuly.',
                data: users
            });
        }
    });
};

//Create new user
exports.new = function (req, res){
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.passwordHash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    newUser.name = req.body.name;
    newUser.surname = req.body.surname;
    newUser.dateOfBirth = req.body.dateOfBirth;
    newUser.authKey = uuidv4();

    //Saving the user and checking for errors
    newUser.save(function(err){
        if(err){
            res.json({
                status:'error',
                message:'There was a problem creating the user.'
            });
        }else{
            res.json({
                status:'success',
                message:'New user added successfuly.',
                data: newUser
            });
        }
    });
};

//Getting the user by userId
exports.view = function (req, res){
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.json({
                status:'error',
                message:'There was a problem fetching the user.'
            });
        }else{
            res.json({
                status:'success',
                message:'User fetched successfuly.',
                data: user
            });
        }
    });
}

//Updating the existing user, for now we can update the name and the surname
exports.update = function(req, res){
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.json(err);
        }else{
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.save(function(err){
                if(err){
                    res.json(err);
                }else{
                    res.json({
                        status:'success',
                        message:'User data updated successfuly.',
                        data: user
                    });
                }
            });
        }
    });
}

//Deactivating the existing user account
exports.delete = function(req, res){
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.json(err);
        }else{
            user.active = false;
            user.save(function(err){
                if(err){
                    res.json(err);
                }else{
                    res.json({
                        status:'success',
                        message: 'User account deactivated successfuly.'
                    })
                }
            });
        }
    });
}

//Login the user
exports.login = function(req, res){
    var passwordHash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    User.findOne({username: req.body.username, passwordHash: passwordHash}, function(err, user){
        if(err){
            res.json(err);
        }else if(user === null){
           res.json({
               status:'error',
               message:'Login failed, Username or password is wrong.'
           });
        }else{
            res.json({
                status:'success',
                message:'Login successful.',
                data:user
            });
        }
    });
}