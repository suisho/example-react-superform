var assert = require("power-assert")
var buildState = require("../js/view/build_kana_state.js")
var testMsg = function(input, expect, msg ){
  msg = msg || ""
  return [input.prevValue, "=>", input.value , "("+input.kana+")", "->" , expect.kana , ":", msg].join(" ")
}
var test = function(input, expect, msg ){
  it(testMsg(input, expect, msg), function(done){
    buildState(input, function(err, result){
      var keys = [ "kana", /*"buffer"*/]
      keys.forEach(function(key){
        assert.equal(result[key], expect[key], "fail:" + key)
      })
      done()
    })
  })
}
var testPending = function(input , expect, msg){
  it(testMsg(input, expect, msg))
}
describe("kana", function(){
  test({
    value : "ｙ",
    kana : "",
    buffer : ""
  }, {
    value : "ｙ",
    kana : "",
    buffer : ""
  })
  test({
    value : "あ",
    buffer: "",
    kana: "",
  }, {
    value : "あ",
    kana : "あ",
    buffer: "",
  })
  test({
    value : "あい",
    kana : "あ",
    buffer: "",
  }, {
    value : "あい",
    kana : "あい",
    buffer: "",
  })
  test({
    value : "あ",
    kana : "あい",
    buffer: "",
  },{
    value : "あ",
    kana : "あ",
    buffer: "",
  })
  test({
    value : "山本",
    prevValue : "やまもと",
    kana : "やまもと",
    buffer : ""
  }, {
    value : "山本",
    kana : "やまもと",
    buffer : "やまもと"
  }, "Convert")

  test({
    value : "山田た",
    kana : "やまだ",
    buffer : "やまだ"
  }, {
    value : "山田た",
    kana : "やまだた",
    buffer : "やまだ"
  })
  test({
    value : "山田た",
    prevValue : "山田たろ",
    kana : "やまだたろ",
    buffer : "やまだ"
  },{
    value : "山田た",
    kana : "やまだた",
    buffer : "やまだ"
  }, "backspace")
  test({
    buffer: "やまだ",
    kana: "やまだ",
    value: "山田"
  },{
    buffer: "やまだ",
    kana: "やまだ",
    value: "山田"
  })
  test({
    buffer: "やまだ",
    kana: "やまだ",
    value: "山"
  },{
    buffer: "やまだ",
    kana: "やまだ",
    value: "山"
  })
  test({
    kana: "やまやま",
    value: "やま山",
    buffer : "やまやま"
  },{
    buffer: "やまやま",
    kana: "やまやま",
    value: "やま山"
  })
  test(
    {buffer: "", kana: "や", value: "やま"},
    {buffer: "", kana: "やま", value: "やま"}
  )
  test(
    {buffer: "", kana: "や", value: "やｍ", prevValue : "や"},
    {value : "やｍ", kana : "や", buffer : "や"}
  )
  test(
    {buffer: "", kana: "やま", prevValue: "やま", value: "山"},
    {kana : "やま"}
  )
  test(
    {buffer: "あやま",  kana: "あやま", value: "あ山や"},
    {buffer : "あやま", kana : "あやまや", value : "あ山や"}
  )

  test(
    {buffer: "", kana: "や", value: "やｍ", prevValue: "や"},
    {buffer: "や", value: "やｍ", kana: "や"}
  )
  test(
    {buffer: "や", kana: "や", value: "やま", prevValue: "やｍ", prevKana: "や"},
    {buffer : "", kana : "やま", value : "やま"}
  )
  test(
    {buffer: "やまだ", kana: "やまだ", value: "山田た", prevValue: "山田ｔ", prevKana: "やまだ"},
    {buffer : "やまだ", kana : "やまだた"}
  )
  test(
    {buffer: "やまだ", kana: "やまだた", value: "山田", prevValue: "山田た"},//active : null, prevActive : た presani: null
    {buffer: "やまだ", kana: "やまだ"},
    "Backspace"
  )
  test(
    {buffer: "やまだ", kana: "やまだたろう", value: "山田太郎", prevValue: "山田たろう"},
    {buffer: "やまだたろう", kana: "やまだたろう"},
    "Convert"
  )
  test(
    {buffer: "", kana: "まりお", value: "まりお", prevValue: "マリオ"},
    {buffer: "", kana: "まりお"},
    "Katakana to Hiragana"
  )
  test(
    {buffer: "やまもとま", kana: "やまもとま", value: "山本まり", prevValue: "山本まｒ"},
    {kana: "やまもとまり"}
  )
  test(
    {buffer: "やまもとまりお", kana: "やまもとまりお", value: "山本麻里お", prevValue: "山本万里生"},
    {kana: "やまもとまりお"},
    "Convert"
  )
  test(
    {buffer: "やまもと", kana: "やまもとまりお", value: "山本麻里お", prevValue: "山本まりお"},
    {kana: "やまもとまりお"}
  )
})