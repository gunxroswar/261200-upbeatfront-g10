import React from "react";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconSunHigh,
} from "@tabler/icons";
import Navbar from "../components/Navbar";

export default function Lab07() {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState([]);
  //15. load todos
  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    setTodos(JSON.parse(todoStr));
  }, []);

  //14. save todos
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todosStr);
  }, [todos]);

  const onEnter = () => {
    const newTodos = [{ title: todoInput, completed: false }, ...todos];
    if (todoInput == "") alert("Todo cannot be empty");
    else setTodos(newTodos);
    //setTodos([...todos, todoInput])
    setTodoInput("");
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;

    todos[idx].title = todos[idx - 1].title;
    todos[idx].completed = todos[idx - 1].completed;

    todos[idx - 1].title = title;
    todos[idx - 1].completed = completed;
    setTodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;

    todos[idx].title = todos[idx + 1].title;
    todos[idx].completed = todos[idx + 1].completed;

    todos[idx + 1].title = title;
    todos[idx + 1].completed = completed;
    setTodos([...todos]);
  };

  return (
    <div>
      <Navbar />
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control mb-1 fs-4"
            placeholder="insert q,r here..."
            onChange={(event) => {
              setTodoInput(event.target.value);
            }}
            value={todoInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEnter();
              }
            }}
          />
        </div>
        {/* Todos */}
        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            key={i}
            onDelete={() => deleteTodo(i)}
            onMark={() => markTodo(i)}
            onArrowUp={() => moveUp(i)}
            onArrowDown={() => moveDown(i)}
          />
        ))}{" "}
        <p>{todos.length}</p>
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((x) => x.completed === false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((x) => x.completed === true).length})
          </span>
        </p>
        {/* Example 1 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo</span>
        </div>
        {/* Example 2 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo with buttons</span>

          <button className="btn btn-success">
            <IconCheck />
          </button>
          <button className="btn btn-secondary">
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary">
            <IconArrowDown />
          </button>
          <button className="btn btn-danger">
            <IconTrash />
          </button>
        </div> */}
        {/* summary section */}
        {/* <p className="text-center fs-4">
          <span className="text-primary">All (2) </span>
          <span className="text-warning">Pending (2) </span>
          <span className="text-success">Completed (0)</span>
        </p> */}
        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Thirachai Ngaoju 640610628
        </p>
      </div>
    </div>
  );
}
