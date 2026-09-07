import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";

import "./App.css";

import TodoItems from "./components/todoItems";

function App() {
  const todoItems = [
    {
      name: "Buy Milk",
      dueDate: "2/10/2023",
    },
    {
      name: "Go to College",
      dueDate: "2/10/2023",
    },
    {
      name: "Like this Video",
      dueDate: "right now",
    },
  ];

  return (
    <center classname="todo-container">
      <AppName />
      <AddTodo />
      <TodoItems todoItems={todoItems}></TodoItems>
    </center>
  );
}

export default App;
