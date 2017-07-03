var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');

co(function* () {
    // Connection URL
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');

    // 插入一个 document
    var r = yield db.collection('city').insert({ name: "北京" });
    assert.equal(1, r.insertedCount);
    console.log('--------------------r one------------------');
    console.log(r);

    // 插入多个 document
    var r = yield db.collection('city').insert([{ name: "上海" }, { name: "广州" }]);
    assert.equal(2, r.insertedCount);
    console.log('--------------------r many------------------');
    console.log(r);

    // 关闭连接
    db.close();
}).catch(function (err) {
    console.log(err.stack);
});