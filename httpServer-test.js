import http from 'http'
import fs from 'fs'

const hostname = '127.0.0.1'
const port = 8080

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  fs.createReadStream('./big.txt').on('data', (chunk) => {
    res.write(chunk)
  }).on('end', () => {
    res.end('\n')
  })
})
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port} ...`)
})
