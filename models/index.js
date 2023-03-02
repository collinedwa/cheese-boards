const Board = require("./Board");
const User = require("./User");
const Cheese = require("./Cheese");

//associations
User.hasMany(Board);
Board.belongsTo(User);

Board.belongsToMany(Cheese, {through: "cheese_boards"});
Cheese.belongsToMany(Board, {through: "cheese_boards"});

module.exports = {Board, User, Cheese}