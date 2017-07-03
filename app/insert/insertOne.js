var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // 如果collection不存在，则自动创建collection
    var r = yield db.collection('user').insertOne({ name: "北京" });
    assert.equal(1, r.insertedCount);

    // 插入一个 document
    var r = yield db.collection('city').insertOne({
        name: "深圳",
        desc: function () { return 'hello'; }
    }, {
            w: 'majority'
            ,j:true
            , wtimeout: 10000
            //, serializeFunctions: true
            //, forceServerObjectId: true
        });
    assert.equal(1, r.insertedCount);
    console.log('--------------------r insertOne------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});