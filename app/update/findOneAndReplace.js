var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // Get the collection
    var col = db.collection('city');

    // Remove a single document
    var r = yield col.findOneAndReplace(
        { name: "上海" }
        , { enName: "shanghai"}
        , { 
            upsert: false//默认：false
            //,sort: { "enName": -1 } //默认：null
            //,projection: { 'name': 1, 'enName': 1} //默认：null
            ,returnOriginal: true //默认：true
        }); 

    console.log('--------------------r findOneAndReplace------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});