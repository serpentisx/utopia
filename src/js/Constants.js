/**Some constants**/

//For the canvas and ctx
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

//For keys
const KEYS = {
  1: "leftClick",
  67: "c",
  82: "r"
}
const KEY_A = 'A'.charCodeAt(0)
const KEY_D = 'D'.charCodeAt(0)
const KEY_W = 'W'.charCodeAt(0)

// Map building
const KEY_1 = '1'.charCodeAt(0)
const KEY_2 = '2'.charCodeAt(0)
const KEY_3 = '3'.charCodeAt(0)
const KEY_4 = '4'.charCodeAt(0)
const KEY_5 = '5'.charCodeAt(0)
const KEY_6 = '6'.charCodeAt(0)

//For updating
const NOMINAL_UPDATE_INTERVAL = 16

//Game variables
const g_gravity = 0.32;
