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
  var baseBuffer = buffer
  var diff = JsDiff.diffChars(prevValue, value)
  //var isConverted = operateDiff.isConvertedDiff(diff)
  var isRemoved = operateDiff.isRemovedDiff(diff)
  //var isAdded = operateDiff.isAddedDiff(diff)
  var active = getActive(value)
  var prevActive = getActive(prevValue)
  var activeReg = new RegExp(active + "$")
  var isConfused = (function(){ //判定不可能な状態か検出する
    if(!isRemoved){ return false }
    // 削除しているのにactiveが増えたらおかしい
    if(isRemoved && active.length > prevActive.length){
      return true
    }

    if(activeReg.test(buffer)){ return false }
    if(!activeReg.test(prevActive)){ return false}
    return true
  })()
  //console.log([active, buffer])
  // TODO: buffer !== "" は多分いらん。
  if(isConfused){ // isolated
    nextState.kana = kana
    nextState.buffer = baseBuffer
    return nextState
  }

  // fix buffer
  if(prevActive === ""){
    var sanitize = getSanitizedActive(prevValue)
    var sanitizeReg = new RegExp(sanitize + "$")
    buffer = buffer.replace(sanitizeReg, "")
    buffer = buffer.replace(activeReg, "")
  }


  if(isRemoved){
    var removeReg = new RegExp(prevActive + "$")
    buffer = buffer.replace(removeReg, "")
  }
  nextState.buffer = buffer

  if(active.length < prevActive.length && !isRemoved){ // swap
    nextState.kana = nextState.buffer = kana
    return nextState
  }
  nextState.kana = buffer + active
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
