export type TodoItemModelDefaultOptions = {
    id?: string;
    title?: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    completedAt?: Date | null;
    deadlineAt?: Date;
};
export type TodoItemModelOptions = {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date | null;
    completedAt: Date | null;
    deadlineAt: Date;
};

export class TodoItemModel {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date | null;
    completedAt: Date | null;
    deadlineAt: Date;

    constructor(options: TodoItemModelDefaultOptions) {
        const now: Date = new Date();

        // デフォルト値
        const defaults: TodoItemModelOptions = {
            id: now.getTime().toString(),
            title: "TITLE",
            createdAt: now,
            updatedAt: null,
            completedAt: null,
            deadlineAt: new Date(now.getTime() + 42 * 1000),
        };

        const merged: TodoItemModelOptions = { ...defaults, ...options };

        this.id = merged.id;
        this.title = merged.title;
        this.createdAt = merged.createdAt;
        this.updatedAt = merged.updatedAt;
        this.completedAt = merged.completedAt;
        this.deadlineAt = merged.deadlineAt;
    }

    getOptions(): TodoItemModelOptions {
        return {
            id: this.id,
            title: this.title,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            completedAt: this.completedAt,
            deadlineAt: this.deadlineAt,
        };
    }

    /**
     * ToDo が完了済みなら true を返す
     * @return {boolean}
     */
    isCompleted(): boolean {
        return this.completedAt !== null;
    }

    /**
     * 与えられた日付を現在時刻として、残り時間(ms)を計算して返す
     * @param {Date} now
     * @return {number}
     */
    getRemainingTimeMS(now: Date): number {
        return this.deadlineAt.getTime() - now.getTime();
    }

    update(options: TodoItemModelOptions): void {
        const merged: TodoItemModelOptions = { ...this, ...options };

        this.id = merged.id;
        this.title = merged.title;
        this.createdAt = merged.createdAt;
        this.updatedAt = new Date();
        this.completedAt = merged.completedAt;
        this.deadlineAt = merged.deadlineAt;
    }
}
