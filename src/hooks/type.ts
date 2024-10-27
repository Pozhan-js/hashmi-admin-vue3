export namespace HandleData {
  export type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
}

/**
 * 任意类型的异步函数
 */
type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>

/**
 * 任意类型的普通函数
 */
type AnyNormalFunction = (...arg: any[]) => any

/**
 * 任意类型的函数
 */
type AnyFunction = AnyNormalFunction | AnyPromiseFunction

export { type AnyFunction }
