import Add from "../../icon/add.svg";
import edit from "../../icon/pencil.svg";
import delet from "../../icon/delete_.svg";
import correct from "../../icon/correct-mark.svg";
import up from "../../icon/up.svg";
import down from "../../icon/down.svg";
import "../../App.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      todos: [],
      error: "",
      edits: "",
      display: [],
    };
  }

  inputText = (e) => this.setState({ input: e.target.value });
  submit = () => {
    if (this.state.input.trim().length === 0) {
      this.setState({
        error: "please enter a Todo",
      });
    } else if (
      this.state.todos.filter((todo) => todo.text === this.state.input).length >
      0
    ) {
      this.setState({
        error: "You already have this Todo",
      });
    } else {
      this.setState(() => ({
        todos: [
          ...this.state.todos,
          {
            text: this.state.input,
            done: "Done",
            edit: true,
            check: false,
            display: "none",
          },
        ],
        error: "",
        input: "",
      }));
    }
  };
  handleKeypress = (e) => e.keyCode === 13 && this.submit();

  deleteTodoItem = (id) => {
    const newArr = [...this.state.todos];
    newArr.splice(id, 1);
    this.setState({
      todos: newArr,
    });
  };

  doneOrEditTodo = (id, name, firstCondition, secondCondition) => {
    let newItems = [...this.state.todos];
    newItems[id][name] =
      newItems[id][name] === firstCondition ? secondCondition : firstCondition;
    this.setState({ todos: newItems });
  };
  upOrDownTodo = (id, number, direction) => {
    if (
      (direction === "up" && id !== 0) ||
      (direction === "down" && id !== this.state.todos.length - 1)
    ) {
      let upTodo = [...this.state.todos];
      [upTodo[id], upTodo[id - number]] = [upTodo[id - number], upTodo[id]];
      this.setState({ todos: upTodo });
    }
  };

  handleOnEditChange = (e) => this.setState({ edits: e.target.value });

  editInput = (id) => {
    this.setState({ edits: "" });
    const newArr = [...this.state.todos];
    this.setState({ error: "" });
    newArr[id].display = newArr[id].edit === false ? "block" : "none";

    if (
      newArr.filter((todo) => todo.text === this.state.edits).length === 0 &&
      newArr.length !== 0 &&
      newArr[id].edit === true &&
      this.state.edits.length !== 0
    )
      newArr[id].text = this.state.edits;
    else if (
      this.state.edits.length !== 0 &&
      newArr.filter((todo) => todo.text === this.state.edits).length > 0 &&
      newArr[id].edit === true
    )
      this.setState({ error: "you already have this Todo" });

    this.setState({ todos: newArr });
  };

  deleteAll = () => {
    if (this.state.todos.length === 0) {
      this.setState({ error: "make sure you have a Todo" });
    } else {
      this.setState({ todos: [] });
    }
  };

  deleteAllDoneOrCheck = (name, doneOrCheckbool) => {
    if (
      this.state.todos.filter((todo) => todo[name] === doneOrCheckbool).length >
      0
    ) {
      this.setState({
        todos: this.state.todos.filter(
          (todo) => todo[name] !== doneOrCheckbool
        ),
      });
    } else {
      this.setState({ error: "make sure you have a Todo selected" });
    }
  };
  render() {
    return (
      <div className="container">
        <h1 id="title">To do list</h1>
        <div className="input">
          <input
            type="text"
            className="enter"
            onKeyDown={this.handleKeypress}
            placeholder="enter what you want to do"
            onChange={this.inputText}
            value={this.state.input}
          />
          <img
            className="icon"
            alt="add button"
            src={Add}
            onClick={this.submit}
          />
        </div>
        <p className="error">{this.state.error}</p>
        <ul className="lists">
          {this.state.todos.map((todo, idx) => (
            <li key={idx} className={`output ${this.state.todos[idx].done}`}>
              <div className="check">
                <input
                  type="checkbox"
                  checked={this.state.todos[idx].check}
                  readOnly
                  onClick={() => this.doneOrEditTodo(idx, "check", false, true)}
                />
                <label>{this.state.todos[idx].text}</label>
              </div>

              <input
                className="list"
                type="text"
                placeholder={this.state.todos[idx].text}
                onChange={this.handleOnEditChange}
                value={this.state.edits}
                disabled={this.state.todos[idx].edit}
                style={{ display: this.state.todos[idx].display }}
              />
              <div className="iconDisplay">
                <img
                  onClick={() => {
                    this.doneOrEditTodo(idx, "edit", false, true);
                    this.editInput(idx);
                  }}
                  alt="edit Button"
                  className="icons edit"
                  src={edit}
                />
                <img
                  onClick={this.deleteTodoItem(todo)}
                  alt="delete button"
                  className="icons delete"
                  src={delet}
                />
                <img
                  onClick={(e) =>
                    this.doneOrEditTodo(idx, "done", "Done", "notDone")
                  }
                  alt="done button"
                  className="icons finish"
                  src={correct}
                />
                <img
                  onClick={(e) => this.upOrDownTodo(idx, 1, "up")}
                  className="icons arrow"
                  alt="up arrow"
                  src={up}
                />
                <img
                  onClick={(e) => this.upOrDownTodo(idx, -1, "down")}
                  className="icons arrow"
                  alt="down arrow"
                  src={down}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button onClick={this.deleteAll} className="btn">
            dellete all
          </button>
          <button
            className="btn"
            onClick={() => this.deleteAllDoneOrCheck("check", true)}
          >
            dellete All done
          </button>
          <button
            onClick={() => this.deleteAllDoneOrCheck("done", "notDone")}
            className="btn"
          >
            dellete All check
          </button>
        </div>
      </div>
    );
  }
}

export default App;
