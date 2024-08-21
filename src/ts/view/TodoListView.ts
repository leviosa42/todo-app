import { TodoItemModel } from "../model/TodoItemModel.ts";
import { TodoItemView } from "./TodoItemView.ts";
import { OnDelete, OnUpdate } from "../types.ts";

export class TodoListView {
  createElement(todos: Set<TodoItemModel>, {
    onUpdate,
    onDelete,
  }: {
    onUpdate: OnUpdate;
    onDelete: OnDelete;
  }): HTMLUListElement {
    const ulE: HTMLUListElement = document.createElement("ul");
    ulE.className = "todo-list";

    todos.forEach((todo: TodoItemModel) => {
      const todoItemView: TodoItemView = new TodoItemView();
      ulE.appendChild(todoItemView.createElement(todo, {
        onUpdate,
        onDelete,
      }));
    });

    return ulE;
  }
}
