import Keyboard from './keyboard.js'
// import U from './util.js'

const WIDTH = 6
const HEIGHT = 6

const map =
  '000000' +
  '010000' +
  '010010' +
  '100010' +
  '110110' +
  '000000'

const getMapVal = function getMapVal (x, y) {
  return parseInt(map[x + WIDTH * y])
}

const $game = document.getElementById('game')
const $table = document.createElement('table')
$game.appendChild($table)
const $tbody = document.createElement('tbody')
$table.appendChild($tbody)

const cells = []

for (let y = 0; y < HEIGHT; y++) {
  const $tr = document.createElement('tr')
  for (let x = 0; x < WIDTH; x++) {
    const $td = document.createElement('td')
    $td.className = 't' + getMapVal(x, y)
    $tr.appendChild($td)
    cells.push($td)
  }
  $tbody.appendChild($tr)
}

const player = [0, 0]
const $player = document.createElement('div')
$player.className = 'player'
$game.appendChild($player)

const transition = function transition (el, time) {
  el.style.transition = time + 'ms all'
  // Note: must add a check to make more continuous
  /*
  setTimeout(() => {
    el.style.transition = 'none'
  }, time)
  */
}

const movePlayer = function movePlayer (x, y, time) {
  transition($player, time)
  player[0] = x
  player[1] = y
  $player.style.left = x * 72 + 'px'
  $player.style.top = y * 72 + 'px'
}

const isInBounds = function isInBounds (x, y) {
  return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT
}

const move = function move (cx, cy) {
  const [x, y] = [player[0] + cx, player[1] + cy]
  // We want a way to tell whether we successfully moved or not
  if (!isInBounds(x, y) || getMapVal(x, y) === 1) return false
  movePlayer(x, y, 250)
  return true
}

const keyboard = new Keyboard()
keyboard.bind(window)

let isMoving = false
// Only problem is that it's kind of chunky
// Smooth movement is ideal, but implementation would vary a lot from what is here
// It would be necessary to implement a proper renderer instead of
// lazily using CSS transition (which is already pretty nice, if I might add)
const main = function main () {
  if (!isMoving) {
    const st = keyboard.getStates()

    // Should implement XOR
    if (st.w || st.a || st.s || st.d) {
      // There are some problems with priority when
      // two keys are pressed at theh same time
      // Ideally, it should function as follows:
      // If I am pressing W then start pressing A,
      // the A doesn't change anything (until W is lifted)
      let x
      let y
      if (st.w) {
        x = 0
        y = -1
      } else if (st.a) {
        x = -1
        y = 0
      } else if (st.s) {
        x = 0
        y = 1
      } else if (st.d) {
        x = 1
        y = 0
      }

      if (typeof x === 'number') {
        const isValid = move(x, y)

        if (isValid) {
          isMoving = true
          setTimeout(() => {
            isMoving = false
          }, 250)
        }
      }
    }
  }

  // Request to do this again ASAP
  requestAnimationFrame(main);
}

main()

window.keyboard = keyboard
window.cells = cells
window.player = $player
window.move = move
window.movePlayer = movePlayer
window.isMoving = () => isMoving
