const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('frontend', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const productController = require('./controllers/products');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(productController.notFound);

app.listen(3000);
