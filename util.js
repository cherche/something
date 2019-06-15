const U = {}

// It turns out this might now really work for us . . .
U.throttle = function throttle (func, wait) {
  let allowed = true

  return function throttled () {
    if (allowed) {
      console.log(options)
      func.call(this, arguments)
      allowed = false

      setTimeout(() => {
        allowed = true
      }, wait)
    }
  }
}

/*
U.debounce = function debounce (func, wait) {
  let timer = null

  return (options) => {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(options), delay)
    } else {
      // This allows the initial call to go through
      fn.apply(options)
    }
  }
}
*/

export default U
