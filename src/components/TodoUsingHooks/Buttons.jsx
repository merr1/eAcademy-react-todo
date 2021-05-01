import React from "react";

const Buttons = ({ todos, setTodos, setError }) => {
  const deleteAll = () => {
    if (todos.length === 0) {
      setError("make sure you have a Todo");
    } else {
      setTodos([]);
    }
  };
  const deleteAllDoneOrCheck = (name, doneOrCheckboolean) => {
    if (todos.filter((todo) => todo[name] === doneOrCheckboolean).length > 0) {
      setTodos(todos.filter((todo) => todo[name] !== doneOrCheckboolean));
    } else {
      setError("make sure you have a Todo selected");
    }
  };
  return (
    <div className="buttons">
      <button onClick={deleteAll} className="btn">
        dellete all
      </button>
      <button
        className="btn"
        onClick={() => deleteAllDoneOrCheck("check", true)}
      >
        dellete All done
      </button>
      <button
        onClick={() => deleteAllDoneOrCheck("done", "notDone")}
        className="btn"
      >
        dellete All check
      </button>
    </div>
  );
};

export default Buttons;
