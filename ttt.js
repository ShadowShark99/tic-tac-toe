const game = (function(){

  function createPlayer(name, symbol){
    let score = 0;
    const win = () => score++;
    const getScore = () => score;
    return {name, symbol, win, getScore};
  }

  const b = (function(){
    let board = Array(9).fill(null);
    const fillSquare = (square, symbol) => {
      board[square] = symbol;
    };

    const symbolWon = (symbol) => {
      if(board[0] === symbol && board[1] === symbol && board[2] === symbol)
      {
        resetBoard();
        return true;
      }
      else if(board[0] === symbol && board[4] === symbol && board[8] === symbol)
      {
        resetBoard();
        return true;
      }
      else if(board[0] === symbol && board[3] === symbol && board[6] === symbol)
      {
        resetBoard();
        return true;
      }
      else if(board[1] === symbol && board[4] === symbol && board[7] === symbol)
      {
        resetBoard();
        return true;
      }
      else if(board[2] === symbol && board[4] === symbol && board[6] === symbol)
      {
        resetBoard();
        return true;
      }
      else if(board[2] === symbol && board[5] === symbol && board[8] === symbol)
      {
        resetBoard();return true;
      }
      else if(board[3] === symbol && board[4] === symbol && board[5] === symbol)
      {
        resetBoard();return true;
      }
      else if(board[6] === symbol && board[7] === symbol && board[8] === symbol)
      {
        resetBoard();return true;
      }
      return false;

    }

    const resetBoard = () => {
      for(let i = 0; i < 9; i++)
      {
        board[i] = null;
      }
      turn = -1;
      display();
      
    };
    return {board, fillSquare, symbolWon};
  
  })();

  

  const displayController = (function(){
    const displayBoard = () => {
      let board = b.board;
      let htmlBoard = document.querySelector(".board");
      htmlBoard.innerHTML = "";
      for(let i = 0; i < 9; i++)
      {
        console.log(board[i]);
        let box = document.createElement('div');
        box.classList.toggle("box");
        box.innerHTML = board[i];
        box.addEventListener("click", () => {
          console.log("clicked");
          if(board[i] === null)
          {
            let p = players[turn % 2];
            let s = p.symbol;
            board[i] = s;
            if(b.symbolWon(s))
            {
              p.win();
              console.log("Won");
              console.log(p.getScore());
            }
            turn = turn + 1;
            console.log("added " + board[i] + " on " + turn);
            display();
          }

        });
        htmlBoard.appendChild(box);
      }
    };

    const displayPlayers = () => {
      let playerDisplay = document.querySelector(".game-info");
      playerDisplay.innerHTML = "";
      for(let i = 0; i < 2; i++)
      {
        let p = players[i]; 
        let scoreDiv = document.createElement('div');
        let playerInfo = document.createElement('div');
        playerInfo.innerHTML = `${p.name} on ${p.symbol} with ${p.getScore()} wins`;
        let playerInput = document.createElement('input');
        playerInput.addEventListener('keypress', (e) =>{
          if(e.key === 'Enter')
          {
            p.name = e.target.value;
            e.target.value = "";
            displayPlayers();
            
          }
        });
        scoreDiv.appendChild(playerInfo);
        scoreDiv.appendChild(playerInput);

        
        playerDisplay.appendChild(scoreDiv);
      }

    };

    return {displayBoard,displayPlayers};
  })();

  const display = ()=> {
    displayController.displayBoard();
    displayController.displayPlayers();
  };

  const restart = () => {
    for(let i = 0; i < 9; i++)
    {
      b.board[i] = null;
    }
    
    display();
    turn = 0;
  }

  const startButton = () => {
    let button = document.querySelector("button");
    button.addEventListener("click", () => {
      console.log("click");
      restart();
    });
  
  };

  //gameflow code
  let turn = 0;
  let players = [createPlayer("P1","X"), createPlayer("P2","O")];

  return {display, startButton};
})();




//global code
game.startButton();
game.display();

