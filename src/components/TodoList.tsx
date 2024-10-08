// @deno-types="@types/react"
import { useEffect, useState } from "react";
import { isTodo, Todo } from "../types/Todo.ts";
import "../styles/TodoList.css";
export default () => {
  const loadedTodos = localStorage.getItem("todos");
  const initialTodos = loadedTodos === null
    ? []
    : JSON.parse(loadedTodos, (k: string, v: unknown) => {
      if (
        k === "createdAt" || k === "updatedAt" || k === "completedAt" || k === "deadlineAt" ||
        k === "removedAt"
      ) {
        return v === null ? null : new Date(v as string);
      }
      return v;
    });
  if (!Array.isArray(initialTodos) || !initialTodos.every((todo) => isTodo(todo))) {
    // localStorage.removeItem("todos");
    console.error("Invalid todos data", initialTodos);
  }
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos, (k, v) => {
        if (v instanceof Date) {
          return v.toISOString();
        }
        return v;
      }),
    );
    console.log("todos", todos);
  }, [todos]);

  const [nowTime, setNowTime] = useState<Date>(new Date());

  setInterval(() => {
    setNowTime(new Date());
  }, 1000);

  return (
    <>
      <form
        className="new-todo"
        onSubmit={(event) => {
          event.preventDefault();
          const titleE = (event.target as HTMLFormElement).querySelector(
            ".title",
          ) as HTMLInputElement;
          if (titleE.value === "") {
            return;
          }
          const now = new Date();
          setTodos([...todos, {
            id: now.getTime(),
            title: titleE.value,
            createdAt: now,
            updatedAt: null,
            completedAt: null,
            deadlineAt: new Date(now.getTime() + 1000 * 60 * 3),
            removedAt: null,
          }]);
          titleE.value = "";
        }}
      >
        <input type="text" className="title" placeholder="+タスクを追加" />
      </form>
      <div className="todo-list-container">
        <ul className="todo-list">
          {todos
            .filter((todo: Todo) => todo.removedAt === null)
            .map((todo: Todo) => (
              <li key={todo.id} className="todo">
                <div className="checkbox">
                  <input
                    type="checkbox"
                    checked={todo.completedAt !== null}
                    onChange={() => {
                      const now = new Date();
                      setTodos(todos.map((t) => {
                        return t.id !== todo.id ? t : {
                          ...t,
                          completedAt: t.completedAt === null ? now : null,
                          updatedAt: now,
                        };
                      }));
                    }}
                  />
                </div>
                <div className="title">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      console.debug("submit", todo);
                    }}
                  >
                    <input
                      type="text"
                      value={todo.title}
                      onChange={(event) => {
                        const titleE = event.target as HTMLInputElement;
                        setTodos(todos.map((t) => {
                          return t.id !== todo.id ? t : {
                            ...t,
                            title: titleE.value,
                          };
                        }));
                      }}
                    />
                  </form>
                </div>
                <div className="timer">
                  <label>
                    {todo.deadlineAt === null ? "" : ((ms: number): string => {
                      if (ms < 0) return "期限切れ";
                      const absMS = Math.abs(ms);
                      const hh = Math.floor(absMS / (1000 * 60 * 60)).toString()
                        .padStart(2, "0");
                      const mm = Math.floor((absMS / (1000 * 60)) % 60).toString()
                        .padStart(2, "0");
                      const ss = Math.floor((absMS / 1000) % 60).toString().padStart(2, "0");
                      return `${hh}:${mm}:${ss}`;
                    })(todo.deadlineAt.getTime() - nowTime.getTime())}
                  </label>
                </div>
                <div className="delete">
                  <button
                    onClick={() => {
                      setTodos(todos.map((t) => {
                        return t.id !== todo.id ? t : {
                          ...t,
                          removedAt: new Date(),
                        };
                      }));
                    }}
                  />
                </div>
                <div className="progress">
                  <div
                    className="bar"
                    style={{
                      width: todo.deadlineAt === null ? "0%" : ((ms: number): string => {
                        if (ms < 0) return "0%";
                        const absMS = Math.abs(ms);
                        const percent = Math.min(100, (absMS / (1000 * 60 * 3)) * 100);
                        return `${percent}%`;
                      })(todo.deadlineAt.getTime() - nowTime.getTime()),
                    }}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
