var assert = require("power-assert")
var buildState = require("../js/view/build_kana_state.js")
var test = function(input, expect, msg ){
  msg = msg || ""
  it(expect.value + " -> " + expect.kana + ":"+ msg, function(){
    var result = buildState(input)
    var keys = ["value", "kana"]
    keys.forEach(function(key){
      assert.equal(result[key], expect[key], "fail:" + key)
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
    value : "山本た",
    kana : "やまもと",
    buffer : "やまもと"
  }, {
    value : "山本た",
    kana : "やまもとた",
    buffer : "やまもと"
  })
  test({
    value : "山本た",
    kana : "やまもとたろ",
    buffer : "やまもと"
  },{
    value : "山本た",
    kana : "やまもとた",
    buffer : "やまもと"
  })
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
    {buffer: "", kana: "や", value: "やｍ"},
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

  // it("や -> やま", function(){
  //   var result = buildState(
  //     {buffer: "や", kana: "や", value: "やま"}
  //   )
  //   assert.deepEqual(result, {
  //     value : "やま",
  //     kana : "やま",
  //     buffer : "やま"
  //   })
  // })

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