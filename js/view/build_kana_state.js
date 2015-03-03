var convertKana = require("../lib/kana")
module.exports = function(state){
  var nextState = state
  var buffer = state.buffer || ""
  var active = state.value.replace(state.ignore, "")
  nextState.active = active
  nextState.buffer = buffer
  var activeConverted = convertKana(active) 
  // activeConverted = やま
  // active = やまやま
  // value = やま山
  var swap = false
  if(activeConverted === "" && active !== ""){
    swap = true
  }
  if(activeConverted.length !== active.length){
    swap = true
  }
  if(swap){
    nextState.ignore = state.value
    nextState.active = ""
    nextState.buffer = state.kana
    return nextState
  }
  nextState.kana = nextState.buffer + activeConverted
  return nextState
}
