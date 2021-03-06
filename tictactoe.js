let player = ((name, symbol) => {
    return {name, symbol};
});

let gameboard = (() => {
    const _board = document.getElementById("gameboard");
    const _playerOne = player("Jeff", "X");
    const _playerTwo = player("Snake", "O");
    let playerOneTurn = true;
    // let array = [];

    function _initializeBoard() {
        // const board = document.getElementById("gameboard");
        for(let i = 0; i < 9; i++)
        {
            const square = document.createElement("div");
            square.addEventListener("click", _executeTurn);
            _board.appendChild(square);
        }
        const reset = document.getElementById("reset").addEventListener("click", _resetGame);
        

        // player
    };

    const _spotisOccupied = (e) => {
        return e.textContent !== "";
    };
    
    const _addElement = (e) => {
        if(playerOneTurn)
        {e.textContent = _playerOne.symbol;}
        else
        {e.textContent = _playerTwo.symbol;}

        playerOneTurn = !playerOneTurn;
    };

    //checks if player won, and returns player that won or null if no winner yet.
    function _checkGameCompletion() {
        let boardChildren = Array.from(document.querySelectorAll("#gameboard>div"));

        for(let i = 0; i < 3; i++)
        {
            // is there three in a row?
            if(_spotisOccupied(boardChildren[3*i]) && boardChildren[i*3].textContent == boardChildren[i*3 + 1].textContent && boardChildren[i*3].textContent == boardChildren[i*3 + 2].textContent)
            {
                return boardChildren[i*3].textContent;
            }
            
            // is there three in a column?
            if(_spotisOccupied(boardChildren[i]) && boardChildren[i].textContent == boardChildren[i + 3].textContent && boardChildren[i].textContent == boardChildren[i + 6].textContent)
            {
                return boardChildren[i].textContent;
            }
        }
        
        //diagonal match
        if(_spotisOccupied(boardChildren[4]) && 
        ((boardChildren[4].textContent == boardChildren[0].textContent && boardChildren[4].textContent == boardChildren[8].textContent) || 
        (boardChildren[4].textContent == boardChildren[2].textContent && boardChildren[4].textContent == boardChildren[7].textContent)))
        {
            return boardChildren[4].textContent;
        }
        
        // is board full?
        let isFull = true; 
        for(i = 0; i < 9 && isFull; i++)
        {
            if(!_spotisOccupied(boardChildren[i]))
                {isFull = false;}
        }

        return (isFull)? "no one" : false;
    }

    //order function for 
    const _executeTurn = (e) =>
    {
        if(!_spotisOccupied(e.target))
        {
            _addElement(e.target);
            let result = _checkGameCompletion();
            switch (result)
            {
                case _playerOne.symbol : _winAlert(_playerOne);
                                        break;

                case _playerTwo.symbol : _winAlert(_playerTwo);
                                        break;

                case null: _winAlert(null);
            }
        }

    };

    const _resetGame = () =>
    {
                    console.log("full");

        let boardChildren = Array.from(document.querySelectorAll("#gameboard>div"));
        for(let square of boardChildren)
            {square.textContent = "";}

        playerOneTurn = true;
    }

    const _winAlert = (player) =>
    {
        if(typeof player == "object")
        {
            alert(player.name + " won!");
        }
        else if(typeof player == null)
        {
            alert("Draw!");
        }
    }


    _initializeBoard();

    return {};
})();

gameboard;
const reset = () =>
{

}

/*
You???re going to store the gameboard as an array inside of a Gameboard object, so start there! 

Your players are also going to be stored in objects??? and you???re probably going to want an object to control the flow of the game itself.
Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. 
Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, 
letting players click on the gameboard to place their marker. 

Don???t forget the logic that keeps players from playing in spots that are already taken!

Think carefully about where each bit of logic should reside. 

Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in ???logical??? places. 
Spending a little time brainstorming here can make your life much easier later!


Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!




Optional - If you???re feeling ambitious create an AI so that a player can play against the computer!
Start by just getting the computer to make a random legal move.
Once you???ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
If you get this running definitely come show it off in the chatroom. It???s quite an accomplishment!

https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern

*/