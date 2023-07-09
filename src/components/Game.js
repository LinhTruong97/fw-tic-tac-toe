import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History"

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);

  //Declaring a Winner
  useEffect(() => {
    const theWinner = calculateWinner(history[history.length - 1]);
    setWinner(theWinner);
  }, [history]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };


  //Handle player
  const handleClick = (i) => {
    //Copy history up to current move
    const currentHistory = history.slice(0, move + 1);
    //Copy the previous square to update
    const squares = currentHistory[currentHistory.length - 1].slice();
    //check if square is null (if null fill X or 0, if not stop)
    //check if there is winner (if yes stop game)
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //Update the previous square with the new choice to get the new square
    squares[i] = xIsNext ? "X" : "O";
    //Store the new square into history
    setHistory(currentHistory.concat([squares]));
    setMove(currentHistory.length);
    setXIsNext((prevState) => !prevState);
  };

  //Restart game
  const handlRestart = () => {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
    setWinner(null);
    setMove(0)
  };

  //Undo game
  const goToMove = (move) => {
    setMove(move);
    //True = X is next
    setXIsNext(move % 2 === 0);
  };


  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={history[move]} handleClick={handleClick} />
      </div>
      <div>
        <History goToMove={goToMove} history={history} />
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
