const db = require("./db");
const {User, Cheese, Board} = require("./models/index");

// used to store instances and later delete them
const obj = [];


describe("db tests", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
    });

    test("create", async () => {
        newUser = await User.create({
            name: "John",
            email: "goober@goob.com"
        });

        obj.push(newUser);
        
        expect(newUser.name).toBe("John");

        newBoard = await Board.create({
            type: "game",
            description: "tons of fun",
            rating: "2"
        });

        obj.push(newBoard);

        expect(newBoard.type).toBe("game");

        newCheese = await Cheese.create({
            title: "cheddar",
            description: "classic"
        });

        obj.push(newCheese);

        expect(newCheese.title).toBe("cheddar");

    })

    test("can add many boards to one user", async () => {
        firstBoard = await Board.findByPk(1);
        secondBoard = await Board.create({
            type: "big",
            description: "tons of space",
            rating: "5"
        });

        obj.push(secondBoard);

        user = await User.findByPk(1);
        newUser = await User.create({
            name: "Tommy",
            email: "xXtommyXx@tommyworld.com"
        });

        obj.push(newUser);

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

        firstCheese = await Cheese.create({
            title: "american",
            description: "kinda like plastic"
        });

        obj.push(firstCheese);

        anothaCheese = await Cheese.create({
            title: "gouda",
            description: "this cheese is so gouda!"
        });

        obj.push(anothaCheese);

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

    test("can update entry", async () => {
        firstBoard = await Board.findByPk(1);

        expect(firstBoard.type).toBe("game");

        await firstBoard.update({
            type: "stinky"
        });

        expect(firstBoard.type).toBe("stinky");
    })

    test("can delete", async () => {

        for(instance of obj){
            await instance.destroy();
        }

        userList = await User.findAll();
        cheeseList = await Cheese.findAll();
        boardList = await Board.findAll();

        expect(userList.length).toBe(0);
        expect(cheeseList.length).toBe(0);
        expect(boardList.length).toBe(0);
    })
})