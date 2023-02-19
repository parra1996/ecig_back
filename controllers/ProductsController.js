const { Product} = require('../models/index')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const ProductsController = {};

ProductsController.get_all = (req, res) => {
    try { 
        Product.findAll()
            .then(data => {
                res.send(data)
            }); 
    } catch (error) {
        res.send(error)
    }

}

ProductsController.create = (req, res) => {

    let {
        name,
        observations
    } = req.body

    Product.findAll({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: name
                }
            }, ]
        }
    }).then(datosRepetidos => {

        if (datosRepetidos == 0) {

            Product.create({
                    name: name,
                    observations: observations
                }).then(product => {
                    res.send(`${product.name}, agregada a la base de datos`);
                })
                .catch((error) => {
                    res.send(error);
                });
        } else {
            res.send("este producto ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });

}

ProductsController.delete_by_id = (req, res) => {

    let id = req.params.id;

    try {

        Product.destroy({
            where : { id : id },
            truncate : false
        })
        .then(product => {
            res.send(`El Producto con la id: ${id} ha sido eliminado`);
        })

    } catch (error) {
        res.send(error);
    }
}

ProductsController.update = (req,res) => {

    let id = req.params.id;
    const name = req.body.name;
    const observations = req.body.observations;

    Product.findOne({
        where: { id: id }
    }).then(productoEncontrado => {
        const data = {
            name : name,
            observations : observations
        }
        productoEncontrado.update(data)
        .then(
            actualiza => {
                res.send(actualiza)
            }
        )
        .catch((error) => {
            res.status(400).json({
                msg : "ha ocurrido un error",
                error : error
            })
        })
    })
    
}

module.exports = ProductsController;