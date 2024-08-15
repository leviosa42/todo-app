import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    constructor() {
    }

    /**
     * @param {Set<TodoItemModel>} todos
     * @param {Object} listeners
     * @param {function({id: string, title: string, completedAt: string})} listeners.onUpdate
     * @param {function({id: string })} listeners.onDelete
     * @returns {Element}
     */
    createElement(todos, { onUpdate, onDelete }) {
        const ulE = document.createElement("ul");
        ulE.className = "todo-list";
        todos.forEach((todo) => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createElement(todo, {
                onUpdate,
                onDelete,
            });
            ulE.appendChild(todoItemElement);
        });
        return ulE;
    }
}
