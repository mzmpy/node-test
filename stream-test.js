import fs from 'fs'
import { Writable } from 'stream'

const file = fs.createWriteStream('./big.txt')

for(let i=0; i<9; i++) {
  file.write(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${i}\n`)
}

file.end()

const ws = new Writable({
  write(chunk, encoding, callback) {
    callback()
  }
})
const rs = fs.createReadStream('./big.txt')

// 所有的 Readable 流都以暂停模式开始，但可以通过以下方式之一切换到流动模式：
// 添加 'data' 事件句柄
// 调用 stream.resume() 方法
// 调用 stream.pipe() 方法将数据发送到 Writable
// rs.pipe(ws)
rs.on('data', chunk => {
  ws.write(chunk)
  console.log(chunk.toString())
})
