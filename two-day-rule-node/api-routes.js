const router = require('express').Router();
const userController = require('./controller/userController');
const habitController = require('./controller/habitController');
const progressController = require('./controller/progressController');

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

//Adding routes for the progress API
router.route('/progress')
    .post(progressController.new);

router.route('/progress/habit/:habitId')
    .get(progressController.getAllForHabitId);

router.route('/progress/:progressId')
    .delete(progressController.delete);

//Exporting the API routes
module.exports = router;