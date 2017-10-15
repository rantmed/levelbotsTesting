var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');


//Express
var app = express(),
    http = require("http"),
    server = http.createServer(app)


mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;



// para establecer las distintas rutas, necesitamos instanciar el express router
var router = express.Router()  



var configDB = 'mongodb://localhost:27017/levelbots';
var options = { useMongoClient: true}; 

mongoose.connect(configDB, options);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(router);

//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));

//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/views'));



require('./app/routes/routes.js')(app);
require('./app/routes/routeCompany')(app);




app.listen(3000);


