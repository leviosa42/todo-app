export class TodoItemModel {
    id;
    title;
    createdAt;
    updatedAt;
    completedAt;
    deadlineAt;

    /**
     * @constructor
     * @param {Object} options
     * @param {string} options.id
     * @param {string} options.title
     * @param {Date} options.createdAt
     * @param {Date} options.updatedAt
     * @param {Date} options.completedAt
     * @param {Date} options.deadlineAt
     */
    constructor(options) {
        const now = new Date();
        // after 1 minute from now
        const deadline = new Date(now.getTime() + 42 * 1000);
        const defaults = {
            id: Date.now().toString(),
            title: null,
            createdAt: now,
            updatedAt: now,
            completedAt: null,
            deadlineAt: deadline,
        };

        const merged = { ...defaults, ...options };
        this.id = merged.id;
        this.title = merged.title;
        this.createdAt = merged.createdAt;
        this.updatedAt = merged.updatedAt;
        this.completedAt = merged.completedAt;
        this.deadlineAt = merged.deadlineAt;
    }

    /**
     * ToDo が完了済みなら true を返す
     * @return {boolean}
     */
    isCompleted() {
        return this.completedAt !== null;
    }

    /**
     * 与えられた日付を現在時刻として、残り時間(ms)を計算して返す
     * @param {Date} now
     * @return {number}
     */
    getRemainingTimeMS(now) {
        return this.deadlineAt.getTime() - now.getTime();
    }
}
