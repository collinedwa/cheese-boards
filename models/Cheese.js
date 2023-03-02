const db = require("../db");
const Sequelize = require("sequelize")

const Cheese = db.define("cheese", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
});

module.exports = Cheese;