const db = require("../db");
const Sequelize = require("sequelize")

const User = db.define("users", {
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;