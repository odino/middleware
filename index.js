const SYMBOL_ITERATOR = Symbol.iterator

module.exports = class Middleware extends Array {

  [SYMBOL_ITERATOR] () {
    return this
  }

  next (i, context, nextFunc) {
    i |= 0
    const fn = this[i] || nextFunc
    let nextCalled = false

    return {
      done: i++ === this.length,
      value: fn && fn(context, () => {
        if (nextCalled) {
          throw new Error('next() called multiple times')
        }
        nextCalled = true
        // If you really want to use in excess of 5k middleware, ex:
        // return i > 5120 ? Promise.resolve().then(() => this.next(i, context, nextFunc).value) : Promise.resolve(this.next(i, context, nextFunc).value)
        return Promise.resolve(this.next(i, context, nextFunc).value)
      })
    }
  }

  compose (context, nextFunc) {
    try {
      return Promise.resolve(this[SYMBOL_ITERATOR]().next(0, context, nextFunc).value)
    } catch (err) {
      return Promise.reject(err)
    }
  }

}
