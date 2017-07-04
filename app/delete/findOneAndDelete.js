var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // Get the removes collection
    var col = db.collection('city');

    // Remove a single document
    var r = yield col.findOneAndDelete(
        { name: "上海" }
        , { 
            sort: { _id:-1 }//(Object, default:null)
        }); 

    console.log('--------------------r findOneAndUpdate------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});