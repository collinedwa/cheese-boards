const db = require("./db");
const {User, Cheese, Board} = require("./models/index");



describe("db tests", () => {
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

    test("can add many boards to one user", async () => {
        firstBoard = await Board.findByPk(1);
        secondBoard = await Board.create({
            type: "big",
            description: "tons of space",
            rating: "5"
        });

        user = await User.findByPk(1);
        newUser = await User.create({
            name: "Tommy",
            email: "xXtommyXx@tommyworld.com"
        });

        for(i=1; i<3; i++){
            await user.addBoard(i);
            await newUser.addBoard(i);
        }

        userBoardsList = await user.getBoards();
        newUserBoardsList = await newUser.getBoards();

        expect(userBoardsList.length).toBeLessThan(newUserBoardsList.length);
    })

    test("many cheeses can be added to many boards", async () => {
        firstBoard = await Board.findByPk(1);
        secondBoard = await Board.findByPk(2);

        newCheese = await Cheese.create({
            title: "american",
            description: "kinda like plastic"
        });

        anothaCheese = await Cheese.create({
            title: "gouda",
            description: "this cheese is so gouda!"
        });

        for(i=1; i<4; i++){
            await firstBoard.addCheese(i);
            await secondBoard.addCheese(i);
        }

        // eager loading (board has cheeses)

        boardList = await Board.findAll({
            include: [
                {model: Cheese, as: "cheeses"}
            ]
        })

        firstBoardCheeses = boardList[0].cheeses;
        secondBoardCheeses = boardList[1].cheeses;

        expect(firstBoardCheeses.length).toBe(3);
        expect(firstBoardCheeses.length).toEqual(secondBoardCheeses.length);

    })

    test("additional eager loading", async () => {
        userList = await User.findAll({
            include: {
                model: Board, as: "boards"
            }
        })

        cheeseList = await Cheese.findAll({
            include: [
                {model: Board, as: "boards"}
            ]
        });

        firstCheeseBoards = cheeseList[0].boards;
        secondCheeseBoards = cheeseList[1].boards;
        
        expect(userList[1].boards.length).toBe(2);

        expect(firstCheeseBoards.length).toBe(2);
        expect(firstCheeseBoards.length).toEqual(secondCheeseBoards.length);
    })
})