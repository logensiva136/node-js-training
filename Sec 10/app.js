const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute('select * from products')
//   .then((result) => console.log(result[0]))
//   .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((users) => {
      req.user = users;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const Product = require("./models/product");
const User = require("./models/user");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((users) => {
    if (!users) {
      return User.create({ name: "Logentheran", email: "a@b.com" });
    }
    return users;
  })
  .then((users) => {
    // console.log(users);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
