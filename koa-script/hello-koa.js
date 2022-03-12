import Koa from 'koa'
import http from 'http'

const hostname = '127.0.0.1'
const port = 8080

const app = new Koa()

app.use(async ctx => {
  ctx.body = "Hello World!"
})

const server = http.createServer(app.callback())
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port} ...`)
})
