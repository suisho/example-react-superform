var kanautil = require("kanautil")
var japanese = require("japanese")
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


var build = function(prevValue, value, buffer, kana){
  var nextState = {}
  var diff = JsDiff.diffChars(prevValue, value)
  var isConverted = operateDiff.isConvertedDiff(diff)
  var isRemoved = operateDiff.isRemovedDiff(diff)
  var active = getActive(value)
  var prevActive = getActive(prevValue)

  // fix buffer
  if(prevActive === ""){
    var sanitize = getSanitizedActive(prevValue)
    var sanitizeReg = new RegExp(sanitize + "$")
    buffer = buffer.replace(sanitizeReg, "")

    var activeReg = new RegExp(active + "$")
    buffer = buffer.replace(activeReg, "")
  }
  nextState.buffer = buffer


  if(isRemoved){
    var removeReg = new RegExp(prevActive + "$")
    active = active.replace(removeReg, "")
  }
  if(active.length < prevActive.length && !isRemoved){ // swap
    nextState.buffer = kana
    nextState.kana = nextState.buffer
    return nextState
  }
  if(isConverted){
    nextState.kana = buffer + active
  }else{
    nextState.kana = buffer + active
  }
  return nextState
}

var main = function(state){
  var prevValue = japanese.hiraganize(state.prevValue || "")
  var value = japanese.hiraganize(state.value || "")

  return build(prevValue, value, state.buffer, state.kana)
}

module.exports = function(state, callback){
  var next = main(state)
  next.prevValue = state.value
  callback(null, next)
}
