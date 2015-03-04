var kanautil = require("kanautil")

// memo: ignoreはいらないのでは？（文字列最終のひらがなを取ればおしまい）
module.exports = function(state){
  var nextState = {}
  nextState.value = state.value
  //nextState.ignore = state.ignore

  var buffer = state.buffer + ""
  var lastKana = kanautil.split(state.value).pop() || ""
  var nextActive = kanautil.isHiragana(lastKana) ? lastKana : ""

  nextActive = nextActive || ""
  nextState.buffer = buffer
  var swap = false
  if(nextActive === ""){
    swap = true
  }
  /*if(Math.abs(state.active.length - nextActive.length) > 1){
    swap = true
  }*/
  if(swap){
    nextState.buffer = state.kana
    nextState.kana = nextState.buffer
    return nextState
  }
  nextState.kana = state.buffer + nextActive
  return nextState
}
