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

// Typescript Compiler 内部实现的类型
type ABCD = Uppercase<'abcd'>
type abcd = Lowercase<'ABCD'>
type Abcd = Capitalize<'abcd'>
type aBCD = Uncapitalize<'ABCD'>

// 获取存在于AA或者存在于BB内的类型
type AA = '1'|'2'|'3'
type BB = '2'|'3'|'4'
type AB = AA & BB

type CC = Exclude<AA, AB>
type DD = Exclude<BB, AB>
type CD = CC | DD

// SymmetricDifference：获取存在于T或者存在于U内的类型
type SymmetricDifference<T, U> = Exclude<T|U, T&U>
type CDRef = SymmetricDifference<AA, BB>
type CDObject = SymmetricDifference<A, B>

// null、undefined可以赋值给任何其他类型（开启该类型的严格赋值检测（即strictNullChecks = true）除外）
type None1 = null extends undefined ? 1 : 2
type None2 = undefined extends null ? 1 : 2

// 获取T中所有类型为函数的key组成的联合类型
type NotUndefined<T> = T extends undefined ? never : T

type FunctionKeys<T extends object> = {
  [K in keyof T]: NotUndefined<T[K]> extends Function ? K : never
}[keyof T]

type D = FunctionKeys<{
  key1: string,
  key2: (arg: any) => any,
  key3: Function
}>

// 判断类型X和Y是否是同一个类型
type Equals<X, Y, A=X, B=never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ?
  A : B

// 取对象可变属性的keys的联合
type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T]

type ObjectTest = {
  key1: string,
  readonly key2: number,
  key3: boolean,
  readonly key4: symbol,
  key5: object
}

type MutableKeysOfObjectTest = MutableKeys<ObjectTest>

