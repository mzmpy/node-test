interface Animal {
  name: string
}

interface Dog {
  name: string,
  eat: (food: string) => void
}

let dog: Dog = {
  name: 'Tom',
  eat: function (food) {
      console.log(food)
  }
}

// 子类型比父类型更加具体,父类型比子类型更宽泛
let animalDog: Animal = dog

// 类型协变
let dogs: Animal[] = [dog, dog]

type animalFn = (animal: Animal) => void

type dogFn = (dog: Dog) => void

// 类型逆变
let dogFnRef: dogFn = (animal: Animal) => {
  console.log(animal)
}
/** 报错
 * let animalFnRef: animalFn = (dog: Dog) => {
 *   console.log(dog)
 * }
 */

// 双向协变是指函数参数的赋值既可以是父类型赋给子类型，也可以子类型赋给父类型，可以通过设置
// tsconfig.json里的属性strictFunctionType = false来允许双向协变
