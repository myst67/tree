var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    routes = require('./server/routes'),
    homeApi = require('./server/routes/home.api'),
    DB = require('./backend/accessDB'),
    app = express();

var port = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(__dirname + '/'));
app.use(errorhandler());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('/', routes.index);

var baseUrl = '/api/dataservice/';
app.post(baseUrl + 'home', homeApi.craeteTree);
app.get(baseUrl + 'updateHome', homeApi.updateTree);

DB.startup();

process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    DB.close();
});

app.get('*', routes.index);

app.listen(port, function () {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});

exports = module.exports = app;
