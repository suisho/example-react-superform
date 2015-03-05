var extend = require("extend")
var japanese = require("japanese")
var JsDiff = require("diff")

var isHiragana = function(str){
  var m = str.match(japanese.hiraganaRegex)
  return (m && m.length === str.length) ? true : false
}
var updateMap = function(map,  key, value){
  if(!key){
    return map
  }
  if(isHiragana(value)){
    return map
  }
  if(!isHiragana(key)){
    key = map[key] || key
  }
  var currentKana = map[value]
  if(currentKana && currentKana.length < key.length){
    key = currentKana
  }
  map[value] = key
  return map

}
module.exports = function(prev, next, baseMap){
  baseMap = baseMap || {}
  var result = extend(true, {}, baseMap)
  prev = japanese.hiraganize(prev)
  prev = baseMap[prev] || prev
  next = japanese.hiraganize(next)
  if(prev === next){
    return result
  }
  var diff = JsDiff.diffChars(prev, next)
  var buffer = null
  diff.reverse().forEach(function(d){
    if(d.removed){
      buffer = d.value
    }
    if(d.added){
      result = updateMap(result, buffer, d.value)
      buffer = null
    }
  })

  return result
}
