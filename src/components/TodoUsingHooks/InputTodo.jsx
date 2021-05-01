import React from "react";
import Add from "../../icon/add.svg";

const InputTodo = ({ setInput, todos, setTodos, input, setError }) => {
  const inputText = (e) => setInput(e.target.value);
  const submit = () => {
    if (input.trim().length === 0) {
      setError("please enter a Todo");
    } else if (todos.filter((todo) => todo.text === input.trim()).length > 0) {
      setError("You already have this Todo");
    } else {
      setTodos([
        ...todos,
        { text: input.trim(), done: "Done", edit: true, check: false },
      ]);
      setError("");
      setInput("");
    }
  };
  const handleKeypress = (e) => e.keyCode === 13 && submit();

  return (
    <div className="input">
      <input
        type="text"
        className="enter"
        onKeyDown={handleKeypress}
        placeholder="enter what you want to do"
        onChange={inputText}
        value={input}
      />
      <img className="icon" alt="add button" src={Add} onClick={submit} />
    </div>
  );
};

export default InputTodo;
