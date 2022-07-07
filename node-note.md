# `NodeJS`笔记

- 协议升级机制：`HTTP`协议提供了一种特殊的机制，这一机制允许将一个已建立的连接升级成新的、不相容的协议；通常来说总是由客户端发起，服务端选择是否升级
[详情可见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Protocol_upgrade_mechanism)]

- 升级`HTTP/1.1`的连接
  - 当客户端试图升级到一个新的协议时，可以先发送一个普通的请求（`GET`，`POST`等），不过这个请求会包含两项额外的`header`：`Connection: Upgrade`、`Upgrade: protocols`；其中`protocols`指定一项或多项协议名，按优先级排序，以逗号分隔，例如：
```
GET /index.html HTTP/1.1
Host: www.example.com
Connection: upgrade
Upgrade: example/1, foo/2
```
  - 如果服务器决定升级这次连接，就会返回一个`101 Switching Protocols`响应状态码，和一个要切换到的协议的头部字段`Upgrade`；如果服务器没有（或者不能）升级这次连接，它会忽略客户端发送的`Upgrade`头部字段，返回一个常规的响应：例如一个`200 OK`