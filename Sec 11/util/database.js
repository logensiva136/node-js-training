const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

mongoClient.connect(
  "mongodb+srv://logen:logen7143@cluster0.ak1jc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
