const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  //product is single item that we choose
  //gets index number where the item in my cart item
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  //saving all cart items in one array
  const updatedCartItems = [...this.cart.items];
  //checks index number / exist in our cart item list
  if (cartProductIndex >= 0) {
    // newQuantity(1) + existing quantity
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //update quantity only in on initially saved array
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    //else create new obj on db with productId & quantity
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("user", userSchema);

// const mongodb = require("mongodb");
// // const getDb = require("../util/database").getDb;

// class User {
//   constructor(name, email, cart, _id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = _id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     //product is single item that we choose
//     //gets index number where the item in my cart item
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     //saving all cart items in one array
//     const updatedCartItems = [...this.cart.items];
//     //checks index number / exist in our cart item list
//     if (cartProductIndex >= 0) {
//       // newQuantity(1) + existing quantity
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       //update quantity only in on initially saved array
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       //else create new obj on db with productId & quantity
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => console.log(err));

//     //   .findOne({ _id: new mongodb.ObjectId(userId) });
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((cartItem) => {
//       return cartItem.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({
//         "user._id": new mongodb.ObjectId(this._id),
//       })
//       .toArray();
//   }

//   deleteProductFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }
// }

// module.exports = User;
