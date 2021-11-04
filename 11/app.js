const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./util/database");
const User = require("./models/user");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61833f07b13f4a7bf797c824")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Mongo.mongoConnect(() => {
  app.listen(3000);
});
