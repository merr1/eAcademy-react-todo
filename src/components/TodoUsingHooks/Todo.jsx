import React, { useState } from "react";
import InputTodo from "./InputTodo";
import Buttons from "./Buttons";
import Error from "./Error";
import List from "./List";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [edits, setEdits] = useState("");
  return (
    <div className="container">
      <h1 id="title">To do list</h1>
      <InputTodo
        error={error}
        input={input}
        todos={todos}
        setTodos={setTodos}
        setInput={setInput}
        setError={setError}
      />
      <Error error={error} />
      <ul className="lists">
        {todos.map((todo, idx) => (
          <List
            todos={todos}
            setTodos={setTodos}
            text={todo.text}
            key={idx}
            idx={idx}
            todo={todo}
            error={error}
            setError={setError}
            setEdits={setEdits}
            edits={edits}
          />
        ))}
      </ul>
      <Buttons
        setError={setError}
        setTodos={setTodos}
        todos={todos}
        error={error}
      />
    </div>
  );
};
export default Todo;
