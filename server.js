var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    routes = require('./server/routes'),
    craetejobApi = require('./server/routes/craetejob.api'),
    homeApi = require('./server/routes/home.api'),
    customerApi = require('./server/routes/customer.api'),
    uploadApi = require('./server/routes/upload.api'),
    DB = require('./backend/accessDB'),
    multer = require('multer'),
    app = express();

var port = process.env.PORT || 3001;

app.use(function(req, res, next) { //allow cross origin requests
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


// Routes
app.get('/', routes.index);


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({storage: storage}).single('file');

// JSON API
var baseUrl = '/api/dataservice/';
app.post(baseUrl + 'createjob', craetejobApi.craetejob);
app.get(baseUrl + 'customerDetails', customerApi.accountdetails);
app.get(baseUrl + 'home', homeApi.listjob);
app.post(baseUrl + 'register', customerApi.register);
app.post(baseUrl + 'saveDocument', customerApi.saveDocument);
app.post(baseUrl + 'login', customerApi.login);
app.get(baseUrl + 'haveDocument', customerApi.haveDocument);
app.get(baseUrl + 'viewjob', craetejobApi.getJob);
app.post(baseUrl + 'applyJob', craetejobApi.applyJob);
// app.post('/upload/:id', uploadApi.document);

app.post('/upload', function(req, res) 
{
    upload(req,res,function(err){
        console.log('file data====');
        console.log(req.file);
        var response = Object;
        
        if(err){
                response = {success:false,msg:err}
                res.json(response);
        }else{
            response = {success:true,msg:req.file.filename};
            res.json(response);
        }
    });
});

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
