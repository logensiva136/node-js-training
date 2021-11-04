const path = require('path');
const fs = require('fs');

const product = [];
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'prodoucts.json'
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileData) => {
    if (err) {
      return cb([]);
    } else {
      return cb(JSON.parse(fileData));
    }
  });
};
module.exports = class Product {
  constructor(tajuk) {
    this.title = tajuk;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fecthAll(cb) {
    getProductsFromFile(cb);
  }
};
