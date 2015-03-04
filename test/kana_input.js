var assert = require("power-assert")
var buildState = require("../js/view/build_kana_state.js")
var test = function(input, expect, msg ){
  msg = msg || ""
  var msgs = [input.value , "("+input.kana+")", "->" , expect.kana , ":", msg].join(" ")
  it(msgs, function(done){
    buildState(input, function(err, result){
      var keys = [ "kana", "buffer"]
      keys.forEach(function(key){
        assert.equal(result[key], expect[key], "fail:" + key)
      })
      done()
    })
  })
}
describe("kana", function(){
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
    kana : "やまもと",
    buffer : ""
  }, {
    value : "山本",
    kana : "やまもと",
    buffer : "やまもと"
  })
  test({
    value : "山",
    kana : "やまもと",
    buffer : ""
  },{
    value : "山",
    kana : "やまもと",
    buffer : "やまもと"
  })

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
  test({
    value : "ｙ",
    kana : "",
    buffer : ""
  }, {
    value : "ｙ",
    kana : "",
    buffer : ""
  })
  test(
    {buffer: "", kana: "や", value: "やｍ", prevValue : "や"},
    {value : "やｍ", kana : "や", buffer : "や"}
  )
  test(
    {buffer: "", kana: "やま", value: "山"},
    {buffer : "やま",kana : "やま", value : "山"}
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
    "Backspace XXX"
  )
  test(
    {buffer: "やまだ", kana: "やまだたろう", value: "山田太郎", prevValue: "山田たろう"},
    {buffer: "やまだたろう", kana: "やまだたろう"},
    "Convert XXX"
  )
  // it(" ", function(){
  //   return
  //   //{buffer: "や", ignore: "やｍ", active: "やま", kana: "ややま", value: "やま"}
  //   var result = buildState(
  //     {buffer: "や", ignore: "やｍ", active: "", kana: "や", value: "やま"}
  //   )
  //   assert.deepEqual(result,{
  //     buffer: "や",
  //     ignore: "やｍ",
  //     active: "やま",
  //     kana: "やま",
  //     value: "やま"
  //   })
  // })
})