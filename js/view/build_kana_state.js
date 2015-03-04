var kanautil = require("kanautil")
var operateDiff = require("../lib/operate_diff")
var JsDiff = require("diff")

var getActive = function(value){
  var lastKana = kanautil.split(value).pop() || ""
  var nextActive = kanautil.isHiragana(lastKana) ? lastKana : ""

  return nextActive || ""
}

var getSanitizedActive = function(value){
  var split = kanautil.split(value) || []
  return split.reverse()[1] || ""
}


var main = function(state){
  var nextState = {}
  var diff = JsDiff.diffChars(state.prevValue, state.value)

  var buffer = state.buffer
  var kana = state.kana

  var active = getActive(state.value)
  var prevActive = getActive(state.prevValue)

  // like:やｍ
  if(prevActive === ""){
    var sanitizedPreActive = getSanitizedActive(state.prevValue)
    buffer = buffer.replace(sanitizedPreActive, "")
  }
  // deleted value
  /*
  if(active === ""
    && prevActive !== ""
    && kana !== prevActive
  //  && kana !== buffer + prevActive
  ){
    kana = kana.replace(prevActive, "")
  }
  */
  if(operateDiff.isRemovedDiff(diff)){
    kana = kana.replace(prevActive, "")
  }

  nextState.buffer = buffer
  if(active === ""){
    nextState.buffer = kana
    nextState.kana = nextState.buffer
    return nextState
  }
  nextState.kana = buffer + active
  return nextState
}
module.exports = function(state, callback){
  var next = main(state)
  next.prevValue = state.value

  callback(null, next)
}
