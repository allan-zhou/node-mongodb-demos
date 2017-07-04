var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // Get the collection
    var col = db.collection('city');

    var r = yield col.bulkWrite([
        { insertOne: { document: { name: "洛阳" } } }
        , { updateOne: { filter: { name: "广州" }, update: { $set: { desc: null } }, upsert: false } }
        , { deleteOne: { filter: { name: "北京" } } }
    ]);

    console.log('--------------------r buikWrite------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});