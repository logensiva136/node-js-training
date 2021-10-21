const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fecthAll();
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not found', path: '' });
};
