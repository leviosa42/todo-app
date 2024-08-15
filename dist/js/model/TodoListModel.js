import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    /** @type {Set<TodoItemModel>} */
    #todos = new Set();

    /**
     * ToDo を追加する
     * @param {TodoItemModel} todo
     */
    add(todo) {
        this.#todos.add(todo);
        this.emitChange();
    }

    /**
     * id に一致する ToDoItem を更新する
     * @param {number} id
     * @param {{ title?: string, completedAt?: Date }} options
     */
    update(id, options) {
        this.#todos.forEach((todo) => {
            if (todo.id === id) {
                todo.title = options.title;
                todo.completedAt = options.completedAt;
                return;
            }
        });
        this.emitChange();
    }

    /**
     * id に一致する ToDoItem を削除する
     * @param {strirng} id
     */
    delete(id) {
        this.#todos.forEach((todo) => {
            if (todo.id === id) {
                this.#todos.delete(todo);
                return;
            }
        });
        this.emitChange();
    }

    /**
     * 状態が変更された時に呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更された時に登録されたリスナー関数を呼び出す
     * @param  {...any} args
     */
    emitChange(...args) {
        this.emit("change", ...args);
    }

    /**
     * @returns {Set<TodoItemModel>}
     */
    getTodoItems() {
        return this.#todos;
    }
}
