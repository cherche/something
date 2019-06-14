const WIDTH = 5
const HEIGHT = 5

const map = '00000'
  + '01000'
  + '01001'
  + '10001'
  + '11011'

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

let isMoving = false
const transition = function transition (el, time) {
  el.style.transition = time + 'ms all'
  isMoving = true
  setTimeout(() => {
    el.style.transition = 50 + 'ms all'
    isMoving = false
  }, time - 150)
}

const movePlayer = function movePlayer (x, y, time) {
  transition($player, time)
  player[0] = x
  player[1] = y
  $player.style.left = x * 72 + 'px'
  $player.style.top = y * 72 + 'px'
}

const isInBounds = function isInBounds(x, y) {
  return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT
}

const move = function move (cx, cy) {
  const [x, y] = [player[0] + cx, player[1] + cy]
  if (!isInBounds(x, y) || getMapVal(x, y) === 1) return
  movePlayer(x, y, 250)
}

window.addEventListener('keydown', function onKeyDown (e) {
  if (isMoving) return
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      move(0, -1)
      break;
    case 'ArrowLeft':
    case 'a':
      move(-1, 0)
      break;
    case 'ArrowDown':
    case 's':
      move(0, 1)
      break;
    case 'ArrowRight':
    case 'd':
      move(1, 0)
      break;
  }
})

window.cells = cells
window.player = $player
window.movePlayer = movePlayer
