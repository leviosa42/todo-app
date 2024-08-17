import { MyEventEmitter, MyEventListener } from "../EventEmitter.ts";
import { TodoItemModel, TodoItemModelDefaultOptions } from "./TodoItemModel.ts";

export class TodoListModel extends MyEventEmitter {
    #todoItems: Set<TodoItemModel> = new Set();

    /**
     * TodoItemを追加し、変更を通知する
     * @param todoItem {TodoItemModel}
     */
    add(todoItem: TodoItemModel): void {
        this.#todoItems.add(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidに一致するTodoItemのプロパティを更新し、変更を通知する
     * @param id {string}
     * @param options {TodoItemModelOptions}
     */
    update(id: string, options: TodoItemModelDefaultOptions): void {
        this.#todoItems.forEach((todoItem) => {
            if (todoItem.id === id) {
                todoItem.update({
                    ...todoItem.getOptions(),
                    ...options,
                });
                this.emitChange();
            }
        });
    }

    /**
     * 指定したidに一致するTodoItemを削除し、変更を通知する
     * @param id {string}
     */
    delete(id: string): void {
        this.#todoItems.forEach((todoItem) => {
            if (todoItem.id === id) {
                this.#todoItems.delete(todoItem);
                this.emitChange();
            }
        });
    }

    /**
     * 状態が変更された時に呼ばれるリスナー関数を登録する
     * @param {MyEventListener} listener
     * @return {void}
     */
    onChange(listener: MyEventListener): void {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更された時にリスナー関数を呼び出す
     */
    emitChange(): void {
        this.emit("change");
    }

    /**
     * @returns {Set<TodoItemModel>}
     */
    getTodoItems(): Set<TodoItemModel> {
        return this.#todoItems;
    }
}
