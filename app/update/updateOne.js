var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // Get the collection
    var col = db.collection('city');

    // Remove a single document
    var r = yield col.updateOne(
        { name: "深圳" }
        , { $set: { name: "北京" } }
        , { upsert: true}); //update & insert
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    console.log('--------------------r updateOne------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});