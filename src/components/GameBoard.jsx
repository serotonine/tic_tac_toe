import { useState } from "react";

// Get rid of 'activePlayerSymbol' props.
export default function GameBoard({ gameBoard, onSelectSquare }) {
  /** !!! as we need this array alos for the Log component
   *  let's set the state in the ancestor (lifting state) => App.jsx !!!!
   */

  // const [gameBoard, setGameBoard] = useState(initGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  /** !!! if your init state is an Object or an array
   * let not mutate them and create a deep copy instead.
   * Object && arrays are referenced values in js.
   * Otherwise will create bugs among the multiple components instances
   * spreaded in the app. */
  // setGameBoard((prevGameBoard) => {
  /**  This way initGameBoard is mutated.
   * const updateGameBoard = [...initGameBoard]; */
  // This way a copy is created.
  // const updateGameBoard = [...prevGameBoard.map((row) => [...row])];
  // updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  // console.log(updateGameBoard);
  /* console.log(initGameBoard); */
  // return updateGameBoard;
  //  });
  // The props function is executed here.
  // onSelectSquare();
  // }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() =>
                    onSelectSquare(rowIndex, colIndex)
                  } /* onClick={() => handleSelectSquare(rowIndex, colIndex)}*/
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
