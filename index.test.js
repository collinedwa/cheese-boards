const db = require("./db");
const {User, Cheese, Board} = require("./models/index");



describe("create and insert tests", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
    });
    
    test("create", async () => {
        newUser = await User.create({
            name: "John",
            email: "goober@goob.com"
        });
        
        expect(newUser.name).toBe("John");

        newBoard = await Board.create({
            type: "game",
            description: "tons of fun",
            rating: "2"
        });

        expect(newBoard.type).toBe("game");

        newCheese = await Cheese.create({
            title: "cheddar",
            description: "classic"
        });

        expect(newCheese.title).toBe("cheddar");

    })
})