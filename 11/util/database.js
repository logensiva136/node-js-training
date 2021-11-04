const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  mongoClient
    .connect(
      "mongodb+srv://logen:logen@cluster0.ak1jc.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((result) => {
      console.log("Connected");
      _db = result.db();
      cb();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) return _db;
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
