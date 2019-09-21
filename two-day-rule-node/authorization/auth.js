const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    //First we get the token from the request header
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token) return res.status(401).send("Access is denied. No auth token provided.");

    //If we find the token, we try to verify it
    try{
        const decoded = jwt.verify(token, config.get('myprivatekey'));
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid authorization token');    
    }
 }