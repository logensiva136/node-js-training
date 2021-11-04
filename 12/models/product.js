const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// // const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, description, price, imageUrl, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this.userId = userId;
//   }

//   save(id) {
//     const db = getDb();
//     // console.log(this);
//     if (!id) {
//       return db
//         .collection("products")
//         .insertOne(this)
//         .then((result) => {
//           return result;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//     return db
//       .collection("products")
//       .updateOne(
//         { _id: new mongodb.ObjectId(id) },
//         {
//           $set: this,
//         }
//       )
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({})
//       .toArray()
//       .then((result) => {
//         // console.log(result);
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((result) => {
//         // console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteProduct(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
