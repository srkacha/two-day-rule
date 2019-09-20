//Importing modules used in the app
let express = require('express');
let apiRoutes = require('./api-routes');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');


//Initializing the app
let app = express();

//Setting up the server port
var port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

//Using the api routes in the app
app.use('/api', apiRoutes);

app.use(bodyParser.json());

//Connecting to the database and setting the database variable
mongoose.connect('mongodb://localhost/two_day_rule', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


//Launching the app to listen on a specific port
app.listen(port, function() {
    console.log("Running The Two Day Rule API on " +  port);
});