
// from jquery.autoKana
var kanaExtractionPattern = new RegExp("[^ 　ぁあ-んー]", "g")
//var kanaCompactingPattern = new RegExp("[ぁぃぅぇぉっゃゅょ]", "g")

module.exports = function extractKana(value) {
  var val = value || ""
  //val = val.replace(kanaCompactingPattern, "")
  val = val.replace(kanaExtractionPattern, "")
  return val
}
