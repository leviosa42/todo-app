export class TodoItemView {
    /**
     * 各 TodoItemModel に対応した HTML 要素を作成して返す
     * @param {TodoItemModel} todo
     * @param {Object} listeners
     * @param {function({id: string, title: string, completedAt: Date})} listeners.onUpdate
     * @param {function(id: string)} listeners.onDelete
     * @return {Element}
     */
    createElement(todo, { onUpdate, onDelete }) {
        /** @type {HTMLLIElement} */
        const liE = document.createElement("li");
        liE.className = "todo";
        liE.id = todo.id;

        // checkbox 作成
        /** @type {HTMLDivElement} */
        const checkboxDivE = document.createElement("div");
        checkboxDivE.className = "checkbox";
        /** @type {HTMLInputElement} */
        const checkboxInputE = document.createElement("input");
        checkboxInputE.type = "checkbox";
        checkboxInputE.checked = todo.isCompleted();
        checkboxInputE.addEventListener("change", () => {
            const completedAt = checkboxInputE.checked ? new Date() : null;
            onUpdate({
                id: todo.id,
                title: todo.title,
                completedAt,
            });
        });
        checkboxDivE.appendChild(checkboxInputE);
        liE.appendChild(checkboxDivE);

        // title 作成
        /** @type {HTMLDivElement} */
        const titleDivE = document.createElement("div");
        titleDivE.className = "title";
        /** @type {HTMLFormElement} */
        const titleFormE = document.createElement("form");
        titleFormE.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = titleInput.value;
            onUpdate({
                id: todo.id,
                title,
                completedAt: todo.completedAt,
            });
        });
        /** @type {HTMLInputElement} */
        const titleInputE = document.createElement("input");
        titleInputE.type = "text";
        titleInputE.value = todo.title;
        titleFormE.appendChild(titleInputE);
        titleDivE.appendChild(titleFormE);
        liE.appendChild(titleDivE);

        // emoji 作成
        /** @type {HTMLDivElement} */
        const emojiDivE = document.createElement("div");
        emojiDivE.className = "emoji";
        liE.appendChild(emojiDivE);

        // timer 作成
        /** @type {HTMLDivElement} */
        const timerDivE = document.createElement("div");
        timerDivE.className = "timer";
        const timerLabelE = document.createElement("label");
        timerLabelE.textContent = "HH:MM:SS";
        timerDivE.appendChild(timerLabelE);
        liE.appendChild(timerDivE);

        // delete 作成
        /** @type {HTMLDivElement} */
        const deleteDivE = document.createElement("div");
        deleteDivE.className = "delete";
        /** @type {HTMLButtonElement} */
        const deleteButtonE = document.createElement("button");
        deleteButtonE.textContent = "x";
        deleteButtonE.addEventListener("click", () => {
            onDelete({
                id: todo.id,
            });
        });
        deleteDivE.appendChild(deleteButtonE);
        liE.appendChild(deleteDivE);

        // progress 作成
        /** @type {HTMLDivElement} */
        const progressDivE = document.createElement("div");
        progressDivE.className = "progress";
        /** @type {HTMLDivElement} */
        const progressBarDivE = document.createElement("div");
        progressBarDivE.className = "bar";
        progressDivE.appendChild(progressBarDivE);
        liE.appendChild(progressDivE);

        return liE;
    }
}
