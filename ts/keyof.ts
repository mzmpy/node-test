interface obj1 {
  name: string,
  age: number
}

interface obj2 {
  sex: string,
  age: string
}

type obj3 = obj1 & obj2
type obj1Type1 = keyof obj1

let obj: obj3 = {
  name: '',
  sex: '',
  age: (function () {
      throw new Error()
  })()
}
