'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
  
    static associate(models) {

      this.hasMany(models.ProductAquired, {
        foreignKey: 'productID'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    observations: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};