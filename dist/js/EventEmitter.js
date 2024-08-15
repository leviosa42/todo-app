/**
 * イベントを管理するクラス
 */
export class EventEmitter {
    /**
     * イベント名 と 対応するリスナーの配列 を保持する Map
     * @type {Map<string, Set<Function>>}
     * @private
     */
    #listeners = new Map();

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @return {void}
     */
    addEventListener(eventName, listener) {
        // イベント名が登録されていない場合は新規作成
        if (!this.#listeners.has(eventName)) {
            this.#listeners.set(eventName, new Set());
        }
        // イベント名に対応するリスナーの Set に追加
        this.#listeners.get(eventName).add(listener);
        return;
    }

    /**
     * .addEventListener() のエイリアス
     * @param {string} eventName
     * @param {Function} listener
     * @return {void}
     */
    on(eventName, listener) {
        this.addEventListener(eventName, listener);
        return;
    }

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @return {void}
     */
    removeEventListener(eventName, listener) {
        // イベント名が登録されていない場合は何もしない
        if (!this.#listeners.has(eventName)) {
            return;
        }
        // イベント名に対応するリスナーの Set から削除
        this.#listeners.get(eventName).delete(listener);
        return;
    }

    /**
     * .removeEventListener() のエイリアス
     * @param {string} eventName
     * @param {Function} listener
     * @return {void}
     */
    off(eventName, listener) {
        this.removeEventListener(eventName, listener);
        return;
    }

    /**
     * @param {string} eventName
     * @param {...*} args
     * @return {void}
     */
    emit(eventName, ...args) {
        // イベント名に対応するリスナーの Set がない場合は何もしない
        if (!this.#listeners.has(eventName)) {
            return;
        }
        // イベント名に対応するリスナーをすべて呼び出す
        this.#listeners.get(eventName).forEach((listener) => listener(...args));
        return;
    }
}
