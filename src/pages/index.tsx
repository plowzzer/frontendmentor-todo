// import Image from 'next/image'
import { Inter } from "next/font/google";
import { useThemeContext } from "@/context/ThemeProvider";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme, changeTheme } = useThemeContext();

  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [statusShown, setStatusShown] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList((todo) => [{ value: inputValue, status: "active" }, ...todo]);
    setInputValue("");
  };

  const changeStatus = (index) => {
    const changeStatus =
      todoList[index].status === "active" ? "completed" : "active";

    const newTodoList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, status: changeStatus };
      } else {
        return todo;
      }
    });

    setTodoList(newTodoList);
  };

  const deleteStatus = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("todo, save on navigator");
  }, [todoList]);

  return (
    <main className={`p-24 ${inter.className}`}>
      <header className="container mx-auto flex justify-between items-center ">
        <h1 className="text-2xl font-bold uppercase">TODO</h1>
        <button onClick={changeTheme}>{theme}</button>
      </header>

      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full min-h-3 shadow-lg p-4 rounded"
            name="newTodoInput"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Create a new todo..."
          />
        </form>
      </div>

      <div className="container mx-auto">
        <ul>
          {todoList.map(({ value, status }, index) => (
            <li
              key={index}
              className={`flex gap-2 p-2 ${
                statusShown !== status && statusShown !== "all" && "hidden"
              }`}
            >
              <button onClick={() => changeStatus(index)}>{status}</button>
              <span className={`${status === "completed" && "line-through"}`}>
                {value}
              </span>
              <button onClick={() => deleteStatus(index)}>DEL</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <h5>Status:</h5>
          <button
            className={`${statusShown === "all" && "font-bold "}`}
            onClick={() => setStatusShown("all")}
          >
            All
          </button>
          <button
            className={`${statusShown === "active" && "font-bold "}`}
            onClick={() => setStatusShown("active")}
          >
            Active
          </button>
          <button
            className={`${statusShown === "completed" && "font-bold "}`}
            onClick={() => setStatusShown("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </main>
  );
}
