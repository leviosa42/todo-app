import { TodoItemModel } from "../model/TodoItemModel.js";
import { TodoListModel } from "../model/TodoListModel.js";
import { TodoListView } from "../view/TodoListView.js";

export class TodoListController {
    #todoListModel = new TodoListModel();
    /** @type {TodoListView} */
    #todoListView = new TodoListView();

    /**
     * ToDoが追加されたら呼ばれるリスナー関数
     * @returns {void}
     */
    handleAdd(title) {
        this.#todoListModel.add(
            new TodoItemModel({
                title,
                createdAt: new Date(),
                deadlineAt: new Date(Date.now() + 1000 * 60),
            }),
        );
    }

    handleUpdate({ id, title, completedAt }) {
        this.#todoListModel.update(
            id,
            new TodoItemModel({ id, title, completedAt }),
        );
    }

    /**
     * ToDoが削除されたら呼ばれるリスナー関数
     * @returns {void}
     */
    handleDelete(id) {
        this.#todoListModel.delete(id);
    }

    constructor() {
        this.#todoListModel.onChange(() =>
            this.#todoListView.render(this.#todoListModel.todos)
        );
    }

    mount() {
        const formE = document.querySelector("form.new-todo");
        const inputE = formE.querySelector("form.new-todo > input");
        const ulE = document.querySelector("ul.todo-list");

        formE.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = inputE.value;
            this.handleAdd(title);
            inputE.value = "";
        });

        this.#todoListModel.onChange(() => {
            ulE.innerHTML = "";
            this.#todoListView.render(
                this.#todoListModel.getTodoItems(),
                {
                    onUpdated: ({ id, title, completed }) => {
                        this.handleUpdate({ id, title, completed });
                    },
                    onDeleted: (id) => {
                        this.handleDelete(id);
                    },
                },
            )
                .forEach((el) => {
                    ulE.appendChild(el);
                });
        });
    }
}
