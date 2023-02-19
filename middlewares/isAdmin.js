const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/auth')

module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    let {usuario} = jwt.decode(token, secret)
    console.log(secret)
    try {
        if (usuario.rol == 1) {
            next();
        } else {
            res.status(403).send({ msg: `User is not allowed.` });
        }
    } catch (error) {
        res.status(400).json({
            msg: "error"
        })
    }
}