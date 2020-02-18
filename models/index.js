"use strict";
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = {
    "host": process.env.HOST,
    "database": process.env.DATABASE,
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "dialect": process.env.DIALECT
}
const db = {};
let sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    config
);

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach(file => {
        const model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = db;
