var extend = require("extend")
var kanamap = require("./kanamap")
module.exports = function(histories){
  var convertMap = {}
  histories.reduce(function(prev, current){
    extend(convertMap, kanamap(prev, current))
    return current
  })
  var kana = histories[histories.length - 1]
  Object.keys(convertMap).forEach(function(key){
    var val = convertMap[key]
    kana = kana.replace(key, val)
  })
  return kana
}
