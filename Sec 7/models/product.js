const path = require('path');
const fs = require('fs');

const product = [];

module.exports = class Product {
  constructor(tajuk) {
    this.title = tajuk;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(p, (err, data) => {
      let products = [];
      if (err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fecthAll() {
    return product;
  }
};
