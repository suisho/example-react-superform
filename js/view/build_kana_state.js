var convertKana = require("../lib/kana")
module.exports = function(state){
  var nextState = {}
  nextState.value = state.value
  nextState.ignore = state.ignore

  var buffer = state.buffer + ""
  var nextActive = (state.value + "").replace(state.ignore, "")
  nextState.buffer = buffer
  var nextActiveConverted = convertKana(nextActive)

  // activeConverted = やま
  // active = やま
  // value = やま山
  var swap = false
  /*if(activeConverted === "" && active !== ""){
    swap = true
  }*/
  //console.log("ZZZZ", [activeConverted.length, active.length, state.value.length, active])
  /*if(activeConverted.length !== active.length && activeConverted !== ""){
    swap = true
  }*/

  //if(Math.abs(state.value.length - nextActiveConverted.length) > 1){
    //swap = true
  //}
  if(nextActiveConverted === "" && state.active === ""){
    swap = true
    //nextState.kana = state.kana
    //nextState.buffer = state.kana
    //return nextState
  }
  if(Math.abs(state.active.length - nextActiveConverted.length) > 1){
    swap = true
  }
  if(swap){
    nextState.ignore = state.value
    nextState.active = ""
    nextState.buffer = state.kana
    nextState.kana = nextState.buffer
    return nextState
  }
  //nextState.buffer = activeConverted
  nextState.active = nextActiveConverted
  nextState.kana = state.buffer + nextActiveConverted
  return nextState
}
