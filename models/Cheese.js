const db = require("../db");
const Sequelize = require("sequelize")

const Cheese = db.define("cheeses", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
});

module.exports = Cheese;