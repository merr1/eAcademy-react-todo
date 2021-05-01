import React, { useState } from "react";
import edit from "../../icon/pencil.svg";
import delet from "../../icon/delete_.svg";
import correct from "../../icon/correct-mark.svg";
import up from "../../icon/up.svg";
import down from "../../icon/down.svg";

const List = ({
  text,
  todo,
  todos,
  setTodos,
  idx,
  setEdits,
  edits,
  setError,
}) => {
  const [display, setDisplay] = useState("none");
  const deleteTodoItem = () => {
    setTodos(todos.filter((el) => el.text !== todo.text));
  };

  const doneOrEditTodo = (id, name, doneOrEditTrue, doneOrEditFalse) => {
    let newItems = [...todos];
    newItems[id][name] =
      newItems[id][name] === doneOrEditTrue ? doneOrEditFalse : doneOrEditTrue;
    setTodos(newItems);
  };
  const upOrDownTodo = (id, number, direction) => {
    if (
      (direction === "up" && id !== 0) ||
      (direction === "down" && id !== todos.length - 1)
    ) {
      let upTodo = [...todos];
      [upTodo[id], upTodo[id - number]] = [upTodo[id - number], upTodo[id]];
      setTodos(upTodo);
    }
  };

  const handleOnEditChange = (e) => setEdits(e.target.value.trim());

  const editInput = (id) => {
    setError("");
    todos[id].edit === false ? setDisplay("block") : setDisplay("none");
    if (
      todos.filter((todo) => todo.text === edits.trim()).length === 0 &&
      edits.trim().length !== 0 &&
      todos[id].edit === true
    ) {
      const newArr = [...todos];
      newArr[id].text = edits.trim();
      setTodos(newArr);
    } else if (
      edits.length !== 0 &&
      todos.filter((todo) => todo.text === edits.trim()).length > 0 &&
      todos[id].edit === true
    )
      setError("you Already have this Todo");

    setEdits("");
  };
  function handleKey(id) {
    return function (e) {
      if (e.keyCode === 13) {
        doneOrEditTodo(id, "edit", false, true);
        editInput(id);
      }
    };
  }
  return (
    <li className={`output ${todos[idx].done}`}>
      <div className="check">
        <input
          type="checkbox"
          checked={todos[idx].check}
          readOnly
          onClick={() => doneOrEditTodo(idx, "check", false, true)}
        />
        <label>{text}</label>
      </div>

      <input
        className="list"
        type="text"
        placeholder={text}
        onKeyDown={handleKey(idx)}
        onChange={handleOnEditChange}
        value={edits}
        disabled={todos[idx].edit}
        style={{ display: display }}
      />
      <div className="iconDisplay">
        <img
          onClick={() => {
            doneOrEditTodo(idx, "edit", false, true);
            editInput(idx);
          }}
          alt="edit Button"
          className="icons edit"
          src={edit}
        />
        <img
          onClick={deleteTodoItem}
          alt="delete button"
          className="icons delete"
          src={delet}
        />
        <img
          onClick={(e) => doneOrEditTodo(idx, "done", "Done", "notDone")}
          alt="done button"
          className="icons finish"
          src={correct}
        />
        <img
          onClick={(e) => upOrDownTodo(idx, 1, "up")}
          className="icons arrow"
          alt="up arrow"
          src={up}
        />
        <img
          onClick={(e) => upOrDownTodo(idx, -1, "down")}
          className="icons arrow"
          alt="down arrow"
          src={down}
        />
      </div>
    </li>
  );
};
export default List;
