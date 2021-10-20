const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// adding /admin route at infront of following routes
app.use('/admin', adminData);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend', '404.html'));
});

app.listen(3000);
