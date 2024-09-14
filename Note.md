# Node

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

* 执行同步代码时**无区别**，express 和 koa 均遵循洋葱模型

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

* 执行异步代码时**有区别**，koa遵循洋葱模型，express 不遵循洋葱模型

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



# MySQL

**设置外键**

```mysql
ALTER TABLE `products` ADD `brand_id` INT;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES `brands`(id);
```

**编辑外键**

```mysql
-- 获取已经设置的 FOREIGN KEY
SHOW CREATE TABLE `products`;
-- 获取已经设置的 FOREIGN KEY，并新增删除更新时操作
-- restrict / no action / cascade / set null
ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_1`;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES `brands`(id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE;
```

**左连接 (LEFT [OUTER] JOIN)**

```mysql
-- 希望获取左表所有数据
SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id;
```

**内连接 ([INNER / CROSS] JOIN)**

表示左边的表与右边的表都有对应的数据关联

```mysql
-- 与 SELECT * FROM `products`, `brands` WHERE products.brand_id = brands.id 的区别
-- 两张表连接时就会约束数据关系，决定查询结果
SELECT * FROM `products` JOIN `brands` ON products.brand_id = brands.id;
```

**全连接**

```mysql
-- MySQL 不支持全连接(FULL JOIN)，通过左连接 UNION 右连接来实现
(SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id)
UNION
(SELECT * FROM `products` RIGHT JOIN `brands` ON products.brand_id = brands.id)
```

**多对多关系**

- 建立一张关系表

**查询结果转对象 (JSON_OBJECT())**

```mysql
SELECT
	products.id as id, products.title as title, products.price as price,
	JSON_OBJECT('brand_id', brands.id, 'brand_name', brands.`name`) as brand
FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id;
```

**查询结果转数组 (JSON_ARRAYAGG)**

```mysql
SELECT
	brand,
	JSON_ARRAYAGG(JSON_OBJECT('pid', pid, 'title', title, 'price', price)) as list
FROM products
GROUP BY products.brand;
```



# Cookie

**cookie 和 session 的缺点**

- Cookie 会被附加在每个 HTTP 请求中，增加了流量；
- Cookie 是明文传递，存在安全问题；
- Cookie大小限制是 4KB；
- 对于浏览器外的客户端 (IOS, Android)，须手动设置 cookie 和 session；
- 对于分布式系统和服务器集群中如何保证其他系统可以正确解析 session？



# JWT

- 安装依赖

```bash
npm install jsonwebtoken
```

- HS256 对称加密

```js
// 生成 token
const jwt = require('jsonwebtoken');
const payload = { id: 1, username: 'root' }
const token = jwt.sign(payload, secretKey, {
    expiresIn: 60, // 秒
    algorithm: 'HS256'
})
// 验证 token
const result = jwt.verify(token, secretKey, {
    algorithms: ['HS256']
})
```

- RS256 非对称加密

```bash
# 打开 openssl
$ openssl
# 生成私钥
OpenSSL> genrsa -out private.key 2048
# 从私钥生成公钥
OpenSSL> rsa -in private.key -pubout -out public.key
```

```js
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')

// 生成 token
const PRIVATE_KEY = fs.readFileSync(pth.resolve(__dirname, './private.key'))
const token = jwt.sign(payload, PRIVATE_KEY, {
  expiresIn: 24 * 60 * 60,
  algorithm: 'RS256',
});

// 校验 token
const { authorization } = ctx.headers;
const token = authorization.replace('Bearer ', '');
const res = jwt.verify(token, PUBLIC_KEY, {
	algorithms: ['RS256'],
});  // { id: 8, name: 'abc', iat: 1726293370, exp: 1726379770 }
```

