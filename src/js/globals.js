/**Some variables**/

//For the canvas and ctx
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

//For keys
let keys = {}
const KEYS = {
  81: "q",
  67: "c",
  82: "r"
}
const KEY_A = 'A'.charCodeAt(0)
const KEY_D = 'D'.charCodeAt(0)

//For updating
const NOMINAL_UPDATE_INTERVAL = 16
const step = true

//Game variables - will place elsewhere
const gravity = 10;


let isGameOver, stopKey, isUpdatePaused = false


//For rendering
let doClear, doRender = true
let doBox, undoBox, doFlipFlop = false
let frameCounter = 1
