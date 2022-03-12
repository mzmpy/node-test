import { EventEmitter } from 'events'

const myevent1 = new EventEmitter()
const myevent2 = new EventEmitter()

let arr1 = [1, 2, 3, 4, 5]
let arr2 = [1, 2, 3, 4, 5]
let index1 = 0
let index2 = 0

myevent1.on('event1', () => {
  consoleLog(index1, arr1, 'arr1')
})

myevent2.on('event2', () => {
  consoleLog(index2, arr2, 'arr2')
})

function consoleLog(index, arr, mark) {
  const consolelog = new EventEmitter()
  consolelog.on('console', (index, arr) => {
    console.log(mark, arr[index])
  })

  consolelog.emit('console', index, arr, mark)
  index++
  if(index < arr.length) {
    setTimeout(() => consoleLog(index, arr, mark), Math.round(Math.random()*1000))
  }
}

myevent1.emit('event1')
myevent2.emit('event2')
