**为什么需要使用 Buffer**

- 在需要对二进制进行操作的时候可以使用 Buffer

**readFile/writeFile 与 stream 的区别**

- fs 方式直接读写文件，无法控制细节操作，如读取位置，读取字节，暂停读取，继续读取等，大文件也不合适一次性读取；

**express 中的中间件是什么？**

- 中间件本质是传递给 express 的回调函数
- 该回调函数接受三个参数：请求对象，响应对象和 next 函数

**express 注册中间件的方法**

- .use() 任何请求都能匹配

**服务器返回错误信息的两种方案**

- 返回 http 错误码

```js
res.status(401);
res.json('未授权访问');
```

- http 状态码返回 200，信息中包含错误 code/message

```js
// 不设置 status 默认为 200
res.json({
  code: -1001,
  message: '未授权访问',
});
```
