var japanese = require("japanese")
var kanamap = require("../lib/kanamap")

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

var main = function(state){
  var prev = japanese.hiraganize(state.prev || "")
  var current = japanese.hiraganize(state.value || "")
  var map = state.map || {}
  if(prev === current){
    return state
  }
  map = kanamap(prev, current, map)
  var kana = toKana(map, current)

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
