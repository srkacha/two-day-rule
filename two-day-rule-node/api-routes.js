const router = require('express').Router();
const auth = require('./authorization/auth');
const userController = require('./controller/userController');
const habitController = require('./controller/habitController');
const progressController = require('./controller/progressController');

router.get('/', auth, function(req, res){
    res.json({
        status: 'API is working',
        message: 'The Two Day Rule API'
    });
}); 

//Adding the routes for the User API
router.get('/users',auth, userController.index);

router.route('/users/:userId')
    .get(auth, userController.view)
    .put(auth, userController.update)
    .delete(auth, userController.delete);

router.route('/users/register')
    .post(userController.new);

router.route('/users/login')
    .post(userController.login);

//Adding routes for the Habit API
router.route('/habits')
    .post(auth, habitController.new);

router.route('/habits/:habitId')
    .put(auth, habitController.update)
    .delete(auth, habitController.delete);

router.route('/habits/user/:userId')
    .get(auth, habitController.getAllForUserId);

//Adding routes for the progress API
router.route('/progress')
    .post(auth, progressController.new);

router.route('/progress/habit/:habitId')
    .get(auth, progressController.getAllForHabitId);

router.route('/progress/:progressId')
    .delete(auth, progressController.delete);

//Exporting the API routes
module.exports = router;