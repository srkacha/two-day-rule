let router = require('express').Router();
var userController = require('./controller/userController');
var habitController = require('./controller/habitController');

router.get('/', function(req, res){
    res.json({
        status: 'API is working',
        message: 'The Two Day Rule API'
    });
}); 

//Adding the routes for the User API
router.route('/users')
    .get(userController.index);

router.route('/users/:userId')
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);

router.route('/users/register')
    .post(userController.new);

router.route('/users/login')
    .post(userController.login);


//Adding routes for the Habit API
router.route('/habits')
    .post(habitController.new);

router.route('/habits/:habitId')
    .put(habitController.update)
    .delete(habitController.delete);

router.route('/habits/user/:userId')
    .get(habitController.getAllForUserId);

//Exporting the API routes
module.exports = router;