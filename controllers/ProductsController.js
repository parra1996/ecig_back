const {  Products } = require('../models/index');

const { Op  } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const ProductsController = {};

ProductsController.get_all = (req, res) => {
    try { 
        User.findAll()
            .then(data => {
                res.send(data)
            }); 
    } catch (error) {
        res.send(error)
    }
}

module.exports = ProductsController;
