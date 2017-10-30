/**Some variables**/

//For the canvas and ctx
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

//For keys
let keys = {}
const KEYS = {
  81: "q",
  84: "t",
  80: "p",
  79: "o",
  66: "b",
  67: "c",
  85: "u",
  70: "f",
  82: "r"
}
const KEY_A = 'A'.charCodeAt(0)
const KEY_D = 'D'.charCodeAt(0)

//For updating
const NOMINAL_UPDATE_INTERVAL = 16
const step = true

let prevUpdateDt, prevUpdateDu, isUpdateOdd = null
let isGameOver, stopKey, doTimerShow, isUpdatePaused = false


//For rendering
let doClear, doRender = true
let doBox, undoBox, doFlipFlop = false
let frameCounter = 1
