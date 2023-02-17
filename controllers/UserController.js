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

    let nombre = req.body.nombre;
    let edad = req.body.edad;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let profesion = req.body.profesion;
    let sexo = req.body.sexo;
    let rol = req.body.rol;
    console.log("antes de encriptar", req.body.contrasena);
    let contrasena = bcrypt.hashSync(req.body.contrasena, Number.parseInt(authConfig.rounds));

    console.log("despues de encriptar", contrasena);

   

    if (sexo === "hombre") {
        sexo = false;
    } else if(sexo === "mujer"){
        sexo = true;
    } else {
        res.send("El sexo debe ser hombre o mujer");
    }
    console.log(sexo);

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
                    nombre: nombre,
                    apellido: apellido,
                    fecha_nacimiento: fecha_nacimiento,
                    edad: edad,
                    profesion: profesion,
                    sexo: sexo,
                    email: email,
                    contrasena: contrasena,
                    rol: rol
                }).then(usuario => {
                    res.send(`${usuario.nombre}, te has registrado con exito`);
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
    
    let email = req.body.email;
    let contrasena = req.body.contrasena;

    User.findOne({
        where : {email : email}
    }).then(element => {

        if(!element){
            res.send("Usuario o contraseña inválido");
        }else {

            if (bcrypt.compareSync(contrasena, element.contrasena)) { 

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

UserController.modify_password = (req, res) => {
    let id = req.body.id;

    let oldPassword = req.body.oldPassword;

    let newPassword = req.body.newPassword;

    User.findOne({
        where : { id : id}
    }).then(userFound => {

        if(userFound){

            if (bcrypt.compareSync(oldPassword, userFound.contrasena)) {

                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds)); 

                let data = {
                    contrasena: newPassword
                }

                User.update(data, {
                    where: {id : id}
                })
                .then(updated => {
                    res.send(updated);
                })
                .catch((error) => {
                    res.status(401).json({ msg: `Ha ocurrido un error actualizando el password`});
                });

            }else{
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }
        }else{
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));
}

UserController.modify_user = (req, res) => {
    
    let id = req.params.id;
    let claveAnterior = req.body.claveAnterior;
    let claveNueva = req.body.claveNueva;
    User.findOne({
        where: { id: id }
    }).then(usuarioEncontrado => {
        if (usuarioEncontrado) {
            if (bcrypt.compareSync(claveAnterior, usuarioEncontrado.contrasena)) {
                claveNueva = bcrypt.hashSync(claveNueva, Number.parseInt(authConfig.rounds));
                let data = {
                    contrasena: claveNueva
                }
                usuarioEncontrado.update(data, {})
                    .then(actualiza => {
                        res.send(actualiza);
                    })
                    .catch((error) => {
                        res.status(400).json({
                            msg:' Ocurrió algún error al actualizar la contraseña.',
                            error: error
                        });
                    });
            } else {
                
                res.status(401).json({ msg: "Usuario o contraseña inválidos." });
            }
        } else {
            res.status(404).send('Usuario no encontrado.');
        }
    }).catch((error => {
        res.status(400).json({ msg: "sucedió algo inesperado"}); 
    }));
};


UserController.delete_by_id = (req, res) => {

    let id = req.params.id;
    try {
        User.destroy({
                where: {
                    id: id
                },
                truncate: false
            })
            .then(usuarioEliminado => {
                console.log(usuarioEliminado);
                res.send(`El usuario con la id ${id} ha sido eliminado`);
            })
    } catch (error) {
        res.send(error);
    }
}

module.exports = UserController;