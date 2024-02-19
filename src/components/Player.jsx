import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  function handleClick() {
    // !!! Best practice => pass a callback function !!!
    setIsEditing((editing) => !isEditing);
    if (isEditing) {
      onChangeName(symbol, currentName);
    }
  }
  function handleChange(event) {
    const newName =
      // !!! Best practice => pass a callback function !!!
      // param is current value.
      setCurrentName((n) => event.target.value);
  }
  function playerName() {
    if (isEditing) {
      return (
        <input
          type="text"
          required
          value={currentName}
          onChange={handleChange}
        />
      );
    }
    return <span className="player-name">{currentName}</span>;
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">{playerName()}</span>
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
