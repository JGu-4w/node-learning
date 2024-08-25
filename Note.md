**为什么需要使用 Buffer**

- 在需要对二进制进行操作的时候可以使用 Buffer

**readFile/writeFile 与 stream 的区别**

- fs 方式直接读写文件，无法控制细节操作，如读取位置，读取字节，暂停读取，继续读取等，大文件也不合适一次性读取；

**express 中的中间件是什么？**

- 中间件本质是传递给 express 的回调函数
- 该回调函数接受三个参数：请求对象，响应对象和 next 函数

**express 注册中间件的方法**

- .use() 任何请求都能匹配

**express 服务器返回错误信息的两种方案**

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

**koa context 中的请求响应对象**

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  // 请求对象
  console.log(ctx.request); // koa 封装的请求对象
  console.log(ctx.req); // node 封装的请求对象
  // 响应对象
  console.log(ctx.response); // koa 封装的响应对象
  console.log(ctx.res); // node 封装的响应对象
});

app.listen(8000, () => {});
```

- koa 中 .use 无法监听路径，需要使用 koa-router 或 @koa/router 第三方中间件实现路径监听



**express 和 koa 的区别**

设计架构不同

- express 是完整且强大的，内置了很多功能
- koa 更加简洁、自由，只包含最核心的功能，并不会对使用其他中间件进行任何限制。
- 目前架构的趋势偏向于简洁化，参考 React 和 Vue 3 (去除了 EventBus)

执行中间件机制不同

* 执行同步代码时**无区别**

  * koa 按照洋葱模型的执行顺序(调用next()后立即执行下一个中间件，执行完所有中间件后往回再执行)

    ```js
    app.use((ctx, next) => {
      console.log('koa middleware 01');
      msg += 'a';
      next();
      ctx.body = msg;
    });
    
    app.use((ctx, next) => {
      console.log('koa middleware 02');
      msg += 'b';
      next();
    });
    
    app.use((ctx, next) => {
      console.log('koa middleware 03');
      msg += 'c';
      next();
    });
    
    // response: abc
    ```

  * express 中间件执行同步代码时类似

* 执行异步代码时**有区别**

  * koa 需要在每个 next() 前添加 await 变为同步，否则不会等待异步代码执行完成

    ```js
    app.use(async (ctx, next) => {
      console.log('koa middleware 01');
      msg += 'a';
      await next();
      console.log('koa middleware 01 next');
      msg += 'e';
      ctx.body = msg;
    });
    
    app.use(async (ctx, next) => {
      console.log('koa middleware 02');
      msg += 'b';
      await next();
      console.log('koa middleware 02 next');
      msg += 'd';
    });
    
    app.use(async (ctx, next) => {
      console.log('koa middleware 03');
      msg += 'c';
      const res = await fetch('http://localhost:8001');
      const data = await res.json();
      console.log(data);
    });
    
    // response:
    // koa middleware 01
    // koa middleware 02
    // koa middleware 03
    // { code: 0, data: [ { id: 1 }, { id: 2 } ] }
    // koa middleware 02 next
    // koa middleware 01 next
    ```

  * express 执行异步操作只能在最后的中间件中返回结果，无法通过 async/await 的方式等待请求完成后再返回前面的中间件返回结果（因为 express 的 next 是 void 类型，koa 的 next 是 Promise 类型）
