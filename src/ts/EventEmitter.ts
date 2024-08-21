// DOM の EventListener と名前が被るので、MyEventEmitter としている
export type MyEventListener = () => void;

export class MyEventEmitter {
  /** イベントリスナーを保持する Map */
  #eventListeners: Map<string, Set<MyEventListener>> = new Map();

  /**
   * 指定したイベントが発火された時に呼ぶリスナー関数を登録する
   * @param {string} type イベント名
   * @param {MyEventListener} listener イベントリスナー
   * @return {void}
   */
  addEventListener(type: string, listener: MyEventListener): void {
    const listenerSet: Set<MyEventListener> = this.#eventListeners.get(type) ||
      new Set();
    listenerSet.add(listener);
    this.#eventListeners.set(type, listenerSet);
  }

  /**
   * 指定したイベントが発火された時に呼ぶリスナー関数を解除する
   * @param {string} type イベント名
   * @param {MyEventListener} listener イベントリスナー
   * @return {void}
   */
  removeEventListener(type: string, listener: MyEventListener): void {
    const listenerSet: Set<MyEventListener> = this.#eventListeners.get(type) ||
      new Set();
    listenerSet.delete(listener);
  }

  /**
   * 指定したイベントを発火する
   * @param {string} type イベント名
   * @param {any[]} args イベントリスナーに渡す引数
   * @return {void}
   */
  emit(type: string): void {
    const listenerSet: Set<MyEventListener> = this.#eventListeners.get(type) ||
      new Set();
    listenerSet.forEach((listener: MyEventListener) => {
      listener();
    });
    return;
  }

  /**
   * .addEventListener() のエイリアス
   * @param {string} type イベント名
   * @param {MyEventListener} listener イベントリスナー
   * @return {void}
   * @alias addEventListener
   */
  on(type: string, listener: MyEventListener): void {
    this.addEventListener(type, listener);
    return;
  }

  /**
   * .removeEventListener() のエイリアス
   * @param {string} type イベント名
   * @param {MyEventListener} listener イベントリスナー
   * @return {void}
   * @alias removeEventListener
   */
  off(type: string, listener: MyEventListener): void {
    this.removeEventListener(type, listener);
    return;
  }
}
