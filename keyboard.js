export default function Keyboard () {
  const states = {}

  const onkeydown = function onkeydown (e) {
    states[e.key] = true
  }
  const onkeyup = function onkeyup (e) {
    states[e.key] = false
  }

  const bind = function bind (el) {
    el.addEventListener('keydown', onkeydown)
    el.addEventListener('keyup', onkeyup)
  }

  const unbind = function unbind (el) {
    el.removeEventListener('keydown', onkeydown)
    el.removeEventListener('keyup', onkeyup)

    for (let key of Object.keys(states)) {
      states[key] = false
    }
  }

  const keyboard = {
    bind,
    unbind,
    getStates: () => {
      return states
    }
  }

  return keyboard
}
