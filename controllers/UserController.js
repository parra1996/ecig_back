const { User} = require('../models/index');

const { Op  } = require("sequelize");
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const UserController = {};

UserController.get_all = (req, res) => {
    try { 
        User.findAll()
            .then(data => {
                res.send(data)
            }); 
    } catch (error) {
        res.send(error)
    }
}

UserController.register = (req, res) => {

    let {
        name,
        lastName,
        email,
    } = req.body;
    
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    User.findAll({
        where: {
            [Op.or]: [{
                email: {
                    [Op.like]: email
                }
            }, ]
        }

    }).then(datosRepetidos => {

        if (datosRepetidos == 0) {

            User.create({
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                }).then(usuario => {
                    res.send(`${usuario.name}, te has registrado con exito`);
                })
                .catch((error) => { 
                    res.send(error);
                });

        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });


}

UserController.login = (req, res) => {
    
    let {
        email,
        password
    } = req.body;

    User.findOne({
        where : {email : email}
    }).then(element => {

        if(!element){
            res.send("Usuario o contraseña inválido");
        }else {

            if (bcrypt.compareSync(password, element.password)) { 

                let token = jwt.sign({ usuario: element }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                res.json({
                    usuario: element,
                    token: token
                })
            } else {
                res.send("Usuario o contraseña inválido");
            }
        };


    }).catch(error => {
        res.send(error);
    })
    
}

module.exports = UserController;