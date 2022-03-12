/* import * as fs from 'fs'

fs.open('./assert-test.js', 'r', (err, fd) => {
  if(err) {
    console.log(err)
  }

  console.log(fd)
}) */

import { promises as fs } from 'fs'

try{
  fs.open('./assert-test.js', 'r')
    .then(fd => {
      console.log(fd)
      return fd
    })
    .then(fd => {
      fd.close()
    })
} catch(err) {
  console.log(err)
}
