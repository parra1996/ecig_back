const config = require('./config/config');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE || config.development.database, 
    process.env.DB_USER || config.development.username, 
    process.env.DB_PASSWORD || config.development.password,
    {
        host: process.env.DB_HOST || config.development.host,
        port: process.env.DB_PORT || config.development.port || '3306',
        dialect: 'mysql',
        operatorAliases: false,
        pool: {
            max: 5,  
            min: 0,  
            acquire: 30000, 
            idle: 10000 
        },
    }
);

module.exports = sequelize.authenticate()
.then((db)=>{
    console.log('MYSQL connected'); 
    return db;
}); 