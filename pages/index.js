import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  updateInputValue,
} from "@/redux/slices/todo";

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const inputValue = useSelector((state) => state.todo.inputValue);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      storedTodos.forEach((todo) => dispatch(addTodo(todo)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addToList() {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random(),
        title: inputValue,
        done: false,
      };

      dispatch(addTodo(newTodo));
      dispatch(updateInputValue(""));
    }
  }

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center py-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Todo List
        </h1>
        <div className="mb-4">
          <input
            className="w-full p-2 rounded border-2 border-indigo-400 focus:outline-none focus:border-indigo-700"
            type="text"
            value={inputValue}
            onChange={(e) => dispatch(updateInputValue(e.target.value))}
            placeholder="What do you want to do?"
          />
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded mt-2 hover:bg-indigo-700 active:bg-indigo-500 transition-colors"
            onClick={addToList}
          >
            Add to list
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-indigo-100 p-2 rounded mb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2"
                />
                <span
                  className={`text-lg ${
                    todo.done ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button onClick={() => handleDelete(todo.id)}>
                <MdDeleteOutline className="text-red-600 hover:text-red-800 transition-colors hover:pointer-cursor" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
