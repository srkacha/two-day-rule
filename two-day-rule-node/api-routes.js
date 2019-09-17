let router = require('express').Router();

router.get('/', function(req, res){
    res.json({
        status: 'API is working',
        message: 'The Two Day Rule API'
    });
}); 

//Exporting the API routes
module.exports = router;