var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // Get the collection
    var col = db.collection('city');

    // Create ordered bulk, for unordered initializeUnorderedBulkOp()
    var bulk = col.initializeOrderedBulkOp();

    // Insert 10 documents
    for (var i = 0; i < 10; i++) {
        bulk.insert({ a: i });
    }

    // Next perform some upserts
    for (var i = 0; i < 10; i++) {
        bulk.find({ b: i }).upsert().updateOne({ b:i });
    }

    // Finally perform a remove operation
    bulk.find({ b: 1 }).deleteOne();

    // Execute the bulk with a journal write concern
    var result = yield bulk.execute();
    console.log(result);

    db.close();
}).catch(function (err) {
    console.log(err.stack);
});