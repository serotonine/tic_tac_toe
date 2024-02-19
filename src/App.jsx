import { useState } from "react";
import { INIT_GAME_BOARD, PLAYERS } from "./config";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

function getCurrentPlayer(gameTurns) {
  // TROP OBSCUR POUR MOI.
  /*  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  } */
  if (gameTurns.length > 0) {
    return gameTurns[0].player === "X" ? "O" : "X";
  }
  return "X";
}
function getGameBoard(gameTurns) {
  // Create a deep copy of initial Game Board.
  let gameBoard = [...INIT_GAME_BOARD.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function getWinner(gameBoard, players) {
  let winner;
  // Check if win combination.
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // Players.
  const [players, setPlayers] = useState(PLAYERS);
  // Game player turn.
  const [gameTurns, setGameTurns] = useState([]);
  // Used to set active class.
  const activePlayer = getCurrentPlayer(gameTurns);
  // Get the game board.
  const gameBoard = getGameBoard(gameTurns);
  // Get the winner if so.
  const winner = getWinner(gameBoard, players);
  // If the board is full.
  const fullBoard = gameTurns.length === 9 && !winner;
  // Reinit the game board.
  function handleRestart() {
    setGameTurns([]);
  }
  // Function executed on GameBoard component click event.
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getCurrentPlayer(prevTurns);
      // Updated turns.
      return [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
    });
  }
  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      console.log({ ...prevPlayers });
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerName}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || fullBoard) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          gameBoard={gameBoard}
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
