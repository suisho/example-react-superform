var JsDiff = require("diff")

var hasAddedDiff = function(diff){
  return diff.some(function(d){
    return d.added === true
  })
}
var hasRemovedDiff = function(diff){
  return diff.some(function(d){
    return d.removed === true
  })
}
var isRemovedDiff = function(diff){
  return !hasAddedDiff(diff) && hasRemovedDiff(diff)
}

var isConvertedDiff = function(diff){
  return hasAddedDiff(diff) && hasRemovedDiff(diff)
}

var args = function(oldStrOrDiff, newStr){
  if(newStr === undefined){
    return oldStrOrDiff
  }
  return JsDiff.diffChars(oldStrOrDiff, newStr)
}

module.exports.isRemovedDiff = function(oldStr, newStr){
  return isRemovedDiff(args(oldStr, newStr))
}
module.exports.isConvertedDiff = function(oldStr, newStr){
  return isConvertedDiff(args(oldStr, newStr))
}
