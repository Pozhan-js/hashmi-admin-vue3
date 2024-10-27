export const omitObject = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) {
    return obj as Omit<T, TKeys>
  }
  return keys.reduce(
    (pre, cur) => {
      delete pre[cur]
      return pre
    },
    { ...obj },
  )
}

export const pickObject = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((curr, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      curr[key] = obj[key]
    }
    return curr
  }, {} as Pick<T, TKeys>)
}

export const listify = <TValue, TKey extends string | number | symbol, KResult>(
  obj: Record<TKey, TValue>,
  toItem: (key: TKey, value: TValue) => KResult,
) => {
  if (!obj) return []
  const entries = Object.entries(obj)
  if (entries.length === 0) return []
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0] as TKey, entry[1] as TValue))
    return acc
  }, [] as KResult[])
}

export const resetObjectKeys = <T, TKeys extends keyof T>(
  obj: T,
  keys?: TKeys[],
): Partial<T> => {
  if (!obj) return {} as T
  if (!keys || keys.length === 0) {
    let res = {} as Partial<T>
    Object.keys(obj).forEach((item) => {
      res[item] = undefined
    })
  }
  return keys?.reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        ;(acc as Partial<T>)[key] = undefined // 将属性值设置为 undefined
      }
      return acc
    },
    { ...obj },
  ) as T
}

type Person = {
  name: string
  age: number
  address: string
}

const person: Person = {
  name: 'Alice',
  age: 30,
  address: '123 Main St',
}

const keysToReset: (keyof Person)[] = ['name', 'address']

const result = resetObjectKeys(person)
console.log(result)
