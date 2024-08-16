import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { PERIOD_TO_DEADLINE_MS } from "./Constants.js";

export class App {
    #todoListModel;
    #todoListView;

    constructor() {
        this.#todoListModel = new TodoListModel();
        this.#todoListView = new TodoListView();
    }

    /**
     * 定期的に呼び出され、残り時間を更新する
     * @return {void}
     */
    updateTimer() {
        // すべての TodoItemModel をチェックし、各html要素の残り時間を更新する
        const todos = this.#todoListModel.getTodoItems();
        const now = new Date();
        todos.forEach((todo) => {
            const remainingMS = todo.getRemainingTimeMS(now);
            const targetE = document.querySelector(
                `#${CSS.escape(todo.id)} > .timer > label`,
            );
            // タイムゾーンを考慮して、msec を HH:MM:SS形式に整形する
            const formatted = ((ms) => {
                const absMS = Math.abs(ms);
                const hh = String(Math.floor(absMS / 60 / 60 / 1000)).padStart(
                    2,
                    "0",
                );
                const mm = String(Math.floor((absMS / 60 / 1000) % 60))
                    .padStart(
                        2,
                        "0",
                    );
                const ss = String(Math.floor((absMS / 1000) % 60)).padStart(
                    2,
                    "0",
                );
                // return ms >= 0 ? `${hh}:${mm}:${ss}` : `-${hh}:${mm}:${ss}`;
                return ms >= 0 ? `${hh}:${mm}:${ss}` : "期限切れ";
            })(remainingMS);
            targetE.textContent = formatted;
        });
    }

    updateProgress() {
        const todos = this.#todoListModel.getTodoItems();
        const now = new Date();
        todos.forEach((todo) => {
            const remainingMS = todo.getRemainingTimeMS(now);
            /** @type {HTMLDivElement} */
            const targetE = document.querySelector(
                `#${CSS.escape(todo.id)} > .progress > .bar`,
            );
            if (remainingMS <= 0) {
                targetE.style.width = "0%";
                return;
            }
            const progressPercentage = Math.floor(
                (remainingMS / PERIOD_TO_DEADLINE_MS) * 100,
            );
            targetE.style.width = `${progressPercentage}%`;
        });
    }

    mount() {
        const formE = document.querySelector("form.new-todo");
        const inputE = formE.querySelector("form.new-todo > input");
        const todolistContainerDivE = document.querySelector(
            "div.todo-list-container",
        );

        this.#todoListModel.onChange(() => {
            // console.log(
            //     `change: ${
            //         [...this.#todoListModel.getTodoItems().values()].map(
            //             (todo) => todo.title
            //         ).join(", ")
            //     }`,
            // );
            const ulE = this.#todoListView.createElement(
                this.#todoListModel.getTodoItems(),
                {
                    onUpdate: ({ id, title, completedAt }) => {
                        console.log(`update: ${id}, ${title}, ${completedAt}`);
                        this.#todoListModel.update(id, { title, completedAt });
                    },
                    onDelete: ({ id }) => {
                        console.log(`delete: ${id}`);
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

        // フォームを送信したら、新しい TodoItemModel を追加する
        formE.addEventListener("submit", (event) => {
            event.preventDefault();

            // 入力欄が空文字列なら何もしない
            if (inputE.value === "") {
                return;
            }

            this.#todoListModel.add(
                new TodoItemModel({
                    title: inputE.value,
                    deadlineAt: new Date(Date.now() + PERIOD_TO_DEADLINE_MS),
                }),
            );
        });

        setInterval(() => {
            this.updateTimer();
            this.updateProgress();
        }, 1000);
    }
}
