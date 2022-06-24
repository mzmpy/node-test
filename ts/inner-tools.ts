// TS内置类型工具

type readonlyType = Readonly<{
  key1: string,
  key2: number,
}>

type partialType = Partial<{
  name: string,
  age: number
}>

// PartialOptional并不是TS内置类型工具，需自己定义
type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P];
}

type partialOptionalType = PartialOptional<{
  key1: string,
  key2: number,
  key3: ''
}, 'key1' | 'key2'>

let pg: partialType = {
  name: '',
  age: 1
}

type pickType = Pick<{
  name: string,
  sex: string,
  age: number
}, 'name' | 'age'>
