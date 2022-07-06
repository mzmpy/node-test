import http from 'http'
import net from 'net'
import url from 'url'

const URL = url.URL

// 创建一个http服务器作为代理服务器
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
// 监听connect事件，有http connect请求时触发
proxy.on('connect', (req, clientSocket, head) => {
  // head为隧道流的第一个数据包（可能为空）
  console.log('head', head)

  clientSocket.on('data', (chunk) => {
    console.log(chunk.toString())
  })

  // 获取真正要连接的服务器地址并发起连接
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    // 透传客户端和服务器的数据
    serverSocket.write(head);
    clientSocket.pipe(serverSocket);
    serverSocket.pipe(clientSocket);
  });
});

proxy.listen(8081, '127.0.0.1', () => {

  const options = {
    port: 8081,
    // 连接的代理服务器地址
    host: '127.0.0.1',
    method: 'CONNECT',
    // 我们需要真正想访问的服务器地址
    path: 'www.baidu.com',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // 发起http connect请求
  const req = http.request(options);
  req.end();
  // connect请求成功后触发
  req.on('connect', (res, socket, head) => {
    // 发送真正的请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.baidu.com\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
