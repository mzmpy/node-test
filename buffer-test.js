import { Buffer } from 'buffer'

let bff1 = Buffer.alloc(64)
console.log(bff1)

let bff2 = Buffer.from('test')
console.log(bff2)

let bff3 = Buffer.from('test', 'base64')
console.log(bff3)
// decode the buffer according to what it use to encode
console.log(bff3.toString('base64'))

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 复制 `arr` 的内容。
const buf1 = Buffer.from(arr);

// 与 `arr` 共享内存。
const buf2 = Buffer.from(arr.buffer);

// 注意：这里buf1是截断后的Uint8Array
console.log(buf1);
// 打印: <Buffer 88 a0>
console.log(buf2);
// 打印: <Buffer 88 13 a0 0f>