'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName : DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};