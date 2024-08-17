import { TodoListModel } from "./model/TodoListModel.ts";
import { TodoListView } from "./view/TodoListView.ts";
import { TodoItemModel } from "./model/TodoItemModel.ts";

export class App {
    #todoListModel: TodoListModel = new TodoListModel();
    #todoListView: TodoListView = new TodoListView();

    constructor() {
        console.log("App initialized");
    }

    updateTimer(): void {
        const todos: Set<TodoItemModel> = this.#todoListModel.getTodoItems();
        const now: Date = new Date();
        todos.forEach((todo) => {
            const remainingTimeMS = todo.getRemainingTimeMS(now);
            const targetE: HTMLElement | null = document.querySelector(
                `#${CSS.escape(todo.id)} > .timer > label`,
            );
            if (!targetE) return;

            const formatted = ((ms) => {
                const absMS = Math.abs(ms);
                const hh = Math.floor(absMS / (1000 * 60 * 60)).toString()
                    .padStart(2, "0");
                const mm = Math.floor((absMS / (1000 * 60)) % 60).toString()
                    .padStart(2, "0");
                const ss = Math.floor((absMS / 1000) % 60).toString().padStart(
                    2,
                    "0",
                );
                // return `${ms < 0 ? "-" : ""}${hh}:${mm}:${ss}`;
                return `${hh}:${mm}:${ss}`;
            })(remainingTimeMS);

            targetE.textContent = formatted;
        });
    }

    updateProgress(): void {
        const todos: Set<TodoItemModel> = this.#todoListModel.getTodoItems();
        const now: Date = new Date();
        todos.forEach((todo) => {
            const remainingTimeMS = todo.getRemainingTimeMS(now);
            const totalTimeMS = todo.deadlineAt.getTime() -
                todo.createdAt.getTime();
            const progressPercentage = Math.min(
                0,
                (remainingTimeMS / totalTimeMS) * 100,
            );
            const targetE: HTMLElement | null = document.querySelector(
                `${CSS.escape("#" + todo.id)} > .progress > div`,
            );
            if (!targetE) return;
            targetE.style.width = `${progressPercentage}%`;
        });
    }
    mount(): void {
        const formE: HTMLFormElement | null = document.querySelector(
            "form.new-todo",
        );
        const inputE: HTMLInputElement | null = document.querySelector(
            "form.new-todo > input",
        );
        const todolistContainerDivE: HTMLDivElement | null = document
            .querySelector("div.todo-list-container");

        if (!formE || !inputE || !todolistContainerDivE) {
            console.error("Element not found");
            return;
        }

        this.#todoListModel.onChange(() => {
            const todos: Set<TodoItemModel> = this.#todoListModel
                .getTodoItems();
            const ulE: HTMLUListElement = this.#todoListView.createElement(
                todos,
                {
                    onUpdate: ({ id, title, completedAt }) => {
                        console.log("onUpdate", { id, title, completedAt });
                        this.#todoListModel.update(id, {
                            title,
                            completedAt,
                        });
                    },
                    onDelete: ({ id }) => {
                        console.log("onDelete", { id });
                        this.#todoListModel.delete(id);
                    },
                },
            );
            todolistContainerDivE.innerHTML = "";
            todolistContainerDivE.appendChild(ulE);
            this.updateTimer();
            this.updateProgress();
            inputE.value = "";
        });

        formE.addEventListener("submit", (event) => {
            event.preventDefault();
            if (inputE.value.trim() === "") return;

            this.#todoListModel.add(
                new TodoItemModel({
                    title: inputE.value,
                    deadlineAt: new Date(Date.now() + 1000 * 60),
                }),
            );
        });

        setInterval(() => {
            this.updateTimer();
            this.updateProgress();
        }, 1000);
    }
}
