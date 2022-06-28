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
  name?: string,
  sex: string,
  age: number
}, 'name' | 'age'>

// Record的原理
// keyof any得到的是string|number|symbol，原因
// 在于类型的key类型只能为string|number|symbol
type CustomRecord<K extends keyof any, T> = {
  [P in K]: T
}

type MyRecord = CustomRecord<'outerKey1'|'outerKey2', { innerKey: string }>
// Partial、Readonly和Pick都属于同态的，映射只作用于T的属性而没有其它的;
// Record是非同态的，因为在Record的实现中，并没有遍历所有输入的类型，
// K只是约束为keyof any的子类型即可

type A = {
  key1: string,
  key2: number
}

type B = {
  key2: number
}

type ExcludeRef = Exclude<A, B>
type ExtractRef = Extract<A, B>

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

let myOmitRef: MyOmit<A, keyof B> = {
  key1: '???'
}

let omitRef: Omit<A, keyof B> = {
  key1: '???'
}

type FnArgs = Parameters<(arg1: string, args: number) => void>
type FnReturn = ReturnType<(arg1: string, args: number) => void>

class People {
  constructor(public name: string, sex?: number) {}
}

type constructorParamsRef = ConstructorParameters<typeof People>

type instanceTypeRef = InstanceType<typeof People>
type typeOfPeople = typeof People
