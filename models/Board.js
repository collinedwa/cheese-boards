const db = require("../db");
const Sequelize = require("sequelize")

const Board = db.define("boards", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
});

module.exports = Board;