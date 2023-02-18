const {
    ProductAquired
} = require('../models/index');

const {
    Op
} = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const ProductsAquiredController = {};

ProductsAquiredController.get_all = (req, res) => {
    try {
        ProductAquired.findAll()
            .then(data => {
                res.send(data)
            });
    } catch (error) {
        res.send(error)
    }
}

ProductsAquiredController.aquire = (req, res) => {

    const productID = req.params.id;
    const name = req.body.name;
    const observations = req.body.observations;

    try {

        ProductAquired.create({
                productID: productID,
                name: name,
                observations: observations
            })
            .then(producto => {
                if (producto) {
                    res.send(producto)
                } else {
                    res.send("La creación de un nuevo producto ha fallado");
                }
            })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

ProductsAquiredController.update_sub_product = (req, res) => {

    const id = req.params.id
    const name = req.body.name;
    const observations = req.body.observations;

    ProductAquired.findOne({
        where: {
            id: id
        }
    }).then(subProducto => {

        const data = {
            name: name,
            observations: observations
        }

        subProducto.update(data)
            .then(
                actualizado => {
                    res.send(actualizado)
                }
            )
            .catch((error) => {
                res.status(400).json({
                    msg: "ha ocurrido un problema actualizando el sub producto"
                })
            })
    })

}

ProductsAquiredController.delete_by_id = async (req, res) => {

    const id = req.params.id

    try {

        let consulta = `DELETE FROM productaquireds WHERE (id = ${id});`;

        try {
            let resultado = await ProductAquired.sequelize.query(consulta, {
                type: ProductAquired.sequelize.QueryTypes.DELETE
            });

            if (resultado !== 0) {
                res.send("Pedido eliminado con exito!");
            } else {
                res.send("Ha ocurrido algun error al borrar los pedidos")
            }

        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error);
    }
}
module.exports = ProductsAquiredController;