var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    routes = require('./server/routes'),
    craetejobApi = require('./server/routes/craetejob.api'),
    DB = require('./backend/accessDB'),
    app = express();

var port = process.env.PORT || 3001;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(__dirname + '/'));
app.use(errorhandler());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// Routes
app.get('/', routes.index);

// JSON API
var baseUrl = '/api/dataservice/';
app.get(baseUrl + 'createjob', craetejobApi.craetejob);

// Creating a connection to MongoDB
DB.startup();

// Close MongoDB Connection
process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    DB.close();
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(port, function () {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});

exports = module.exports = app;
