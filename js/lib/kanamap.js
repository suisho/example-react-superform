var extend = require("extend")
var japanese = require("japanese")
var JsDiff = require("diff")

var isHiragana = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}
var updateMap = function(map, key, kana){
  if(!key){
    return map
  }
  if(isHiragana(kana)){
    return map
  }
  if(!isHiragana(key)){
    key = map[key] || key
  }
  var currentKana = map[kana]
  if(currentKana && currentKana.length < key.length){
    key = currentKana
  }
  map[kana] = key
  return map
}

module.exports = function(prev, current, baseMap){
  baseMap = baseMap || {}
  prev = japanese.hiraganize(prev)
  current = japanese.hiraganize(current)
  // 連続で変換されたときのmapから、先んじて戻す。
  prev = baseMap[prev] || prev

  if(prev === current){
    return baseMap
  }
  var map = extend(true, {}, baseMap)
  var reversedDiff = JsDiff.diffChars(prev, current).reverse()
  reversedDiff.reduce(function(prevDiff, currentDiff){
    if(!prevDiff.removed || !currentDiff.added){
      return currentDiff
    }
    map = updateMap(map, prevDiff.value, currentDiff.value)
    return currentDiff
  })
  return map
}
