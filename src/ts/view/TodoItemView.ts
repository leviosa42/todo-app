import { TodoItemModel, TodoItemModelOptions } from "../model/TodoItemModel.ts";

export class TodoItemView {
    createElement(
        todo: TodoItemModel,
        {
            onUpdate,
            onDelete,
        }: {
            onUpdate: (
                { id, title, completedAt }: TodoItemModelOptions,
            ) => void;
            onDelete: ({ id }: { id: string }) => void;
        },
    ): HTMLLIElement {
        const liE: HTMLLIElement = document.createElement("li");
        liE.className = "todo";
        liE.id = todo.id;

        // checkbox
        const genereateCheckboxDivE = (): HTMLDivElement => {
            const divE: HTMLDivElement = document.createElement("div");
            divE.className = "checkbox";
            const inputE: HTMLInputElement = document.createElement("input");
            inputE.type = "checkbox";
            inputE.checked = todo.isCompleted();
            inputE.addEventListener("change", () => {
                onUpdate({
                    ...todo.getOptions(),
                    completedAt: inputE.checked ? new Date() : null,
                });
            });
            divE.appendChild(inputE);
            return divE;
        };
        liE.appendChild(genereateCheckboxDivE());

        // title
        const genereateTitleDivE = (): HTMLDivElement => {
            const divE: HTMLDivElement = document.createElement("div");
            divE.className = "title";
            const formE: HTMLFormElement = document.createElement("form");
            formE.type = "text";
            formE.value = todo.title;
            formE.addEventListener("submit", (event) => {
                event.preventDefault();
                onUpdate({
                    ...todo.getOptions(),
                    title: formE.value,
                });
            });
            divE.appendChild(formE);
            return divE;
        };
        liE.appendChild(genereateTitleDivE());

        // timer
        const genereateTimerDivE = (): HTMLDivElement => {
            const divE: HTMLDivElement = document.createElement("div");
            divE.className = "timer";
            const labelE: HTMLLabelElement = document.createElement("label");
            labelE.textContent = "HH:MM:SS";
            divE.appendChild(labelE);
            return divE;
        };
        liE.appendChild(genereateTimerDivE());

        // delete
        const genereateDeleteDivE = (): HTMLDivElement => {
            const divE: HTMLDivElement = document.createElement("div");
            divE.className = "delete";
            const buttonE: HTMLButtonElement = document.createElement("button");
            buttonE.addEventListener("click", () => {
                onDelete({ id: todo.id });
            });
            divE.appendChild(buttonE);
            return divE;
        };
        liE.appendChild(genereateDeleteDivE());

        // progress
        const genereateProgressDivE = (): HTMLDivElement => {
            const divE: HTMLDivElement = document.createElement("div");
            divE.className = "progress";
            const barE: HTMLDivElement = document.createElement("div");
            barE.className = "bar";
            divE.appendChild(barE);
            return divE;
        };
        liE.appendChild(genereateProgressDivE());

        return liE;
    }
}
