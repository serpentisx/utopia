//All of the Globals varibles are here

//For the canvas and ctx
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

/**
* Represents the keys which are interested in
* where the keys are the keyCode with the value as a
* string representation of the keyCode.
* @constant
* @type {Object}
* @default
*/
const KEYS = {
  1: "leftClick",
  37: "left",
  38: "up",
  39: "right",
  40: "down"
}
