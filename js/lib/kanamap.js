var extend = require("extend")
var japanese = require("japanese")
var kanautil = require("kanautil")
var JsDiff = require("diff")

var updateMap = function(map, value, currentBuffer){
  if(!currentBuffer){
    return map
  }
  if(kanautil.isHiragana(value)){
    return map
  }
  if(!kanautil.isHiragana(currentBuffer)){
    currentBuffer = map[currentBuffer] || currentBuffer
  }
  var currentKana = map[value]
  if(currentKana && currentKana.length < currentBuffer.length){
    currentBuffer = currentKana
  }
  map[value] = currentBuffer
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
    if(d.removed){// && kanautil.isHiragana(d.value)){
      buffer = d.value
    }
    //
    if(d.added){
      result = updateMap(result, d.value, buffer)
      buffer = null
      /*
      if(!currentBuffer){
        return
      }
      if(kanautil.isHiragana(d.value)){
        return
      }
      if(!kanautil.isHiragana(currentBuffer)){
        currentBuffer = baseMap[currentBuffer] || currentBuffer
      }
      var currentKana = result[d.value]
      if(currentKana && currentKana.length < currentBuffer.length){
        currentBuffer = currentKana
      }
      result[d.value] = currentBuffer
      */
    }
  })

  return result
}
