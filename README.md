# Middleware

The Modern (ES6) Middleware Composition.

## Installation

```
$ npm install trek-middleware
```

## Examples

```js
const Middleware = require('trek-middleware')
const middleware = new Middleware()

middleware.push((ctx, next) => {
  ctx.arr.push(1)
  next()
  ctx.arr.push(6)
})

middleware.push(async (ctx, next) => {
  ctx.arr.push(2)
  await next()
  ctx.arr.push(5)
})

middleware.push(function * (ctx, next) {
  ctx.arr.push(3)
  yield next()
  ctx.arr.push(4)
})

const ctx = { arr: [] }
middleware.compose(ctx).then(() => {
  console.log(ctx.arr.toString() === '1,2,3,4,5,6')
})
```

## Badges

[![Build Status](https://travis-ci.org/trekjs/middleware.svg?branch=master)](https://travis-ci.org/trekjs/middleware)
[![codecov](https://codecov.io/gh/trekjs/middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/trekjs/middleware)
![](https://img.shields.io/badge/license-MIT-blue.svg)

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
