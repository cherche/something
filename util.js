const U = {}

U.throttle = function throttle (func, wait) {
  let allowed

  return function throttled (options) {
    if (allowed) {
      func.apply(options)

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
