
// from jquery.autoKana
var kanaExtractionPattern = new RegExp("[^ 　ぁあ-んー]", "g")
//var kanaCompactingPattern = new RegExp("[ぁぃぅぇぉっゃゅょ]", "g")

var isHiragana = function(char){
  return char.match(/[あ-ん]/)
}

module.exports = function extractKana(value) {
  var val = value || ""
  //val = val.replace(kanaCompactingPattern, "")
  val = val.replace(kanaExtractionPattern, "")
  return val
}

module.exports.toKatakana = function(str){
  return str.split("").map(function(char){
    if(isHiragana(char)){
      var code = char.charCodeAt()
      return String.fromCharCode(code + 96)
    }
    return char
  }).join("")
}
