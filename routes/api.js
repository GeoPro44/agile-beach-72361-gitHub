var CONTACTS_COLLECTION = "contacts";
var MSGS_COLLECTION = "msgs";

// API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

exports.GetMsgs = function(db) { 
	return function(req, res) {  
	
		console.log('getting msgs');
		
		db.collection(MSGS_COLLECTION).find({}).toArray(function(err, docs) {
			if (err) {
			  handleError(res, err.message, "Failed to get msgs.");
			} else {
			  res.status(200).json(docs);  
			}
		});
	}
};

exports.PostMsgs = function(db) { 
	return function(req, res) {  
		var newMsg = req.body;
		newMsg.createDate = new Date();

		// if (!(req.body.firstName || req.body.lastName)) {
		// handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
		// }

		db.collection(MSGS_COLLECTION).insertOne(newMsg, function(err, doc) {
			if (err) {
			  handleError(res, err.message, "Failed to add msg.");
			} else {
			  res.status(201).json(doc.ops[0]);
			}
		});
	}
};


// app.get("/api/msgs/:id", function(req, res) {
  // db.collection(MSGS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    // if (err) {
      // handleError(res, err.message, "Failed to get msg");
    // } else {
      // res.status(200).json(doc);  
    // }
  // });
// });

// app.put("/api/msgs/:id", function(req, res) {
  // var updateDoc = req.body;
  // delete updateDoc._id;

  // db.collection(MSGS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    // if (err) {
      // handleError(res, err.message, "Failed to update msg");
    // } else {
      // res.status(204).end();
    // }
  // });
// });

// app.delete("/api/msgs/:id", function(req, res) {
  // db.collection(MSGS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    // if (err) {
      // handleError(res, err.message, "Failed to delete msg");
    // } else {
      // res.status(204).end();
    // }
  // });
// });