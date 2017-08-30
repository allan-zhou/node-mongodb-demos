var MongoClient = require('mongodb').MongoClient;
var co = require('co');
var assert = require('assert');
var dbconfig = require('../config/db')


co(function* () {
  // Connection URL
  var db = yield MongoClient.connect(dbconfig.RemoteDbUrl);

  var col = db.collection('users');

  // 插入多个 document
  // var user = yield db.collection('users').insert({ name: "popzhou" });
  // console.log(user);
  
  var users = yield db.collection('users').find().toArray();
  console.log(users);

  // 关闭连接
  db.close();
}).catch(function (err) {
  console.log(err.stack);
});