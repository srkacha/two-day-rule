let router = require('express').Router();
var userController = require('./controller/userController');

router.get('/', function(req, res){
    res.json({
        status: 'API is working',
        message: 'The Two Day Rule API'
    });
}); 

//Adding the routes for the User API
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:userId')
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);

router.route('/users/login')
    .post(userController.login);

//Exporting the API routes
module.exports = router;