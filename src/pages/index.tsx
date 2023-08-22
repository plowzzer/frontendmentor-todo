import { Inter } from "next/font/google";
// import { useThemeContext } from "@/context/ThemeProvider";
import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Circle, X } from "lucide-react";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

interface TodoItem {
  value: string;
  status: string;
}

interface TodoList extends Array<TodoItem> {}

export default function Home() {
  const [inputValue, setInputValue] = useState("" as string);
  const [todoList, setTodoList] = useState([] as TodoList);
  const [statusShown, setStatusShown] = useState("all");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTodoList((todo) => [{ value: inputValue, status: "active" }, ...todo]);
    setInputValue("");
  };

  const changeStatus = (index: any) => {
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

  const deleteStatus = (index: any) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const getAllActive = () => {
    return todoList.filter((item: any) => item.status !== "completed");
  };

  const deleteAllCompleted = () => {
    setTodoList(todoList.filter((item: any) => item.status !== "completed"));
  };

  const positionUp = (index: any) => {
    if (index === 0) {
      return;
    }

    const movedItem = todoList.find((_, i) => index === i);
    const remainingItems = todoList.filter((_, i) => index !== i);

    const reorderedItems = [
      ...remainingItems.slice(0, index - 1),
      movedItem,
      ...remainingItems.slice(index - 1),
    ];

    setTodoList(reorderedItems as TodoList);
  };

  const positionDown = (index: any) => {
    if (index === todoList.length - 1) {
      return;
    }

    const movedItem = todoList.find((_, i) => index === i);
    const remainingItems = todoList.filter((_, i) => index !== i);

    const reorderedItems = [
      ...remainingItems.slice(0, index + 1),
      movedItem,
      ...remainingItems.slice(index + 1),
    ];

    setTodoList(reorderedItems as TodoList);
  };

  useEffect(() => {
    console.log("initial");
    const storageTodoList = localStorage.getItem("todo:todoList");
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    console.log("save on storage");
    const saveOnStorage = setTimeout(() => {
      const fullList = JSON.stringify(todoList);
      localStorage.setItem("todo:todoList", fullList);
    }, 3000);

    return () => clearTimeout(saveOnStorage);
  }, [todoList]);

  return (
    <main className={`${inter.className}`}>
      <Header />

      <div className="container mx-auto -mt-24">
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

        <ul className="mt-12 divide-y divide-gray-200 rounded">
          {todoList.map(({ value, status }, index) => (
            <li
              key={index}
              id={`list-item-${index}`}
              className={`w-full flex justify-between items-center gap-4 p-4 bg-white ${
                statusShown !== status && statusShown !== "all" && "hidden"
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className="flex flex-col ">
                  <button onClick={() => positionUp(index)}>
                    <ChevronUp />
                  </button>
                  <button onClick={() => positionDown(index)}>
                    <ChevronDown />
                  </button>
                </div>
                <button onClick={() => changeStatus(index)}>
                  {status === "active" ? <Circle /> : <CheckCircle />}
                </button>
                <span className={`${status === "completed" && "line-through"}`}>
                  {value}
                </span>
              </div>
              <button onClick={() => deleteStatus(index)}>
                <X />
              </button>
            </li>
          ))}
        </ul>

        <div className="w-full flex justify-between items-start mt-4 gap-4 bg-gray-100 rounded px-8 py-3">
          <h5>{getAllActive().length} items left</h5>

          <div className="flex gap-2">
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

          <button className="font-bold" onClick={deleteAllCompleted}>
            Clear All Completed
          </button>
        </div>
      </div>
    </main>
  );
}
