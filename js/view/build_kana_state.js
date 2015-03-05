var kanautil = require("kanautil")
var japanese = require("japanese")
var operateDiff = require("../lib/operate_diff")
var JsDiff = require("diff")
var extend = require("extend")
var kanamap = require("../lib/kanamap")

var getActive = function(value){
  var lastKana = kanautil.split(value).pop() || ""
  var nextActive = kanautil.isHiragana(lastKana) ? lastKana : ""

  return nextActive || ""
}

var getSanitizedActive = function(value){
  var split = kanautil.split(value) || []
  return split.reverse()[1] || ""
}

var extendMap = function(map, prev, current){
  return kanamap(prev, current, map)
}

var toKana = function(map, value){
  var kana = value
  Object.keys(map).forEach(function(key){
    var val = map[key]
    kana = kana.replace(key, val)
  })
  // to only kana
  var m = kana.match(japanese.hiraganaRegex)
  return m ? m.join("") : ""
}

var sanitize = function(kana){
  var lastSplit = kanautil.split(kana).pop() || ""
  if(kanautil.isHiragana(lastSplit)){
    return kana
  }
  var reg = new RegExp(lastSplit + "$")
  return kana.replace(reg, "")
}

var main = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  var map = state.map || {}
  if(prev === current){
    return state
  }
  map = extendMap(map, prev, current)
  var kana = toKana(map, current)
  kana = sanitize(kana, "")

  var nextState = {
    kana : kana,
    map : map,
  }
  return nextState
}

module.exports = function(state, callback){
  var next = main(state)
  next.prev = state.value
  next.prevKana = state.kana

  callback(null, next)
}
