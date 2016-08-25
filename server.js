var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var api = require('./routes/api');

var jwt = require('jsonwebtoken');  						//https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); 					//https://npmjs.org/package/express-jwt
var secret = 'this is the secret secret secret 12356';

var app = express();
app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.json());

app.use('/api/secure', expressJwt({secret: secret}));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var envMode = process.env.NODE_ENV
var dbUri;

if (envMode == 'production') {
	dbUri = process.env.MONGODB_URI;
} else {
	dbUri = "mongodb://localhost:27017/agileBeachDB";
}

// Connect to the database before starting the application server. 
mongodb.MongoClient.connect(dbUri, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
	var server = app.listen(process.env.PORT || 3000, function () {
		
		var port = server.address().port;
		console.log("App now running on port", port);

		app.get('/api/msgs', api.GetMsgs(db));
		app.post('/api/msgs', api.PostMsgs(db));
		
		app.post('/authenticate', function (req, res) {
			console.log('req.body.username: ' + req.body.username);
			console.log('req.body.password: ' + req.body.password);

			if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
				res.status(401).send('Wrong user or password');
				return;
			}

			var profile = {
				first_name: 'John',
				last_name: 'Doe',
				email: 'john@doe.com',
				id: 123
			};

			var token = jwt.sign(profile, secret, {});
			res.json({ token: token });
		});
		
		app.get('/api/secure/test', function (req, res) {
			console.log('user ' + req.user.email + ' is calling /api/restricted');
			res.json({
				name: 'foo'
			});
		});

  });
});



