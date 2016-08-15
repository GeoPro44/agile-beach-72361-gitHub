var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var api = require('./routes/api');

var app = express();
app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.json());

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

  });
});



