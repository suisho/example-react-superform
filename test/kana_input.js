var assert = require("power-assert")
var buildState = require("../js/view/build_kana_state.js")
describe("kana", function(){
  it(" -> あ", function(){
    var result = buildState({
      value : "あ",
      active : "",
      ignore : "",
      buffer: "",
      kana: "",
    })
    assert.deepEqual(result, {
      value : "あ",
      active : "あ",
      kana : "あ",
      buffer: "",
      ignore : "",
    })
  })
  it("あ -> あい", function(){
    var result = buildState({
      value : "あい",
      active : "あ",
      kana : "あ",
      buffer: "",
      ignore : "",
    })
    assert.deepEqual(result, {
      value : "あい",
      active : "あい",
      kana : "あい",
      buffer: "",
      ignore : "",
    })
  })
  it("あい -> あ", function(){
    var result = buildState({
      value : "あ",
      active : "あい",
      kana : "あい",
      buffer: "",
      ignore : "",
    })
    assert.deepEqual(result, {
      value : "あ",
      active : "あ",
      kana : "あ",
      buffer: "",
      ignore : ""
    })
  })
  it("buffering", function(){
    var result = buildState({
      value : "山本",
      active : "やまもと",
      kana : "やまもと",
      ignore : "",
      buffer : ""
    })
    assert.deepEqual(result, {
      value : "山本",
      active : "",
      ignore : "山本",
      kana : "やまもと",
      buffer : "やまもと"
    })
  })
  it(" 山本　→　山 (remove)", function(){
    var result = buildState({
      value : "山",
      active : "",
      ignore : "山本",
      kana : "やまもと",
      buffer : ""
    })
    assert.deepEqual(result, {
      value : "山",
      active : "",
      ignore : "山",
      kana : "やまもと",
      buffer : "やまもと"
    })
  })
  it("山本 -> 山本た", function(){
    var result = buildState({
      value : "山本た",
      active : "",
      ignore : "山本",
      kana : "やまもと",
      buffer : "やまもと"
    })
    assert.deepEqual(result, {
      value : "山本た",
      active : "た",
      ignore : "山本",
      kana : "やまもとた",
      buffer : "やまもと"
    })
  })
  it("buffering step3 remove", function(){
    var result = buildState({
      value : "山本た",
      active : "たろ",
      ignore : "山本",
      kana : "やまもとたろ",
      buffer : "やまもと"
    })
    assert.deepEqual(result,{
      value : "山本た",
      active : "た",
      ignore : "山本",
      kana : "やまもとた",
      buffer : "やまもと"
    } )
  })
  it("not change", function(){
    var result = buildState({
      buffer: "やまだ",
      ignore: "山田",
      active: "",
      kana: "やまだ",
      value: "山田"
    })
    assert.deepEqual(result,{
      buffer: "やまだ",
      ignore: "山田",
      active: "",
      kana: "やまだ",
      value: "山田"
    })
  })
  it("notchange removed", function(){
    var result = buildState({
      buffer: "やまだ",
      ignore: "山田",
      active: "",
      kana: "やまだ",
      value: "山"})
    assert.deepEqual(result,{
      buffer: "やまだ",
      ignore: "山",
      active: "",
      kana: "やまだ",
      value: "山"
    })
  })
  it("mixed ", function(){
    var result = buildState({buffer: "",
      ignore: "",
      active: "やまやま",
      kana: "やまやま",
      value: "やま山"
    })
    assert.deepEqual(result,{
      buffer: "やまやま",
      ignore: "やま山",
      active: "",
      kana: "やまやま",
      value: "やま山"
    })
  })
  it("や -> やま", function(){
    var result = buildState(
      {buffer: "", ignore: "", active: "や", kana: "や", value: "やま"}
    )
    assert.deepEqual(result,{
      buffer: "",
      ignore: "",
      active: "やま",
      kana: "やま",
      value: "やま"
    })
  })
  it(" 　→　y", function(){
    var result = buildState({
      value : "ｙ",
      active : "",
      ignore : "",
      kana : "",
      buffer : ""
    })
    assert.deepEqual(result, {
      value : "ｙ",
      active : "",
      ignore : "ｙ",
      kana : "",
      buffer : ""
    })
  })
  it(" や　→　やｍ", function(){
    var result = buildState(
      {buffer: "", ignore: "", active: "や", kana: "や", value: "やｍ"}
    )
    assert.deepEqual(result, {
      value : "やｍ",
      active : "や",
      ignore : "",
      kana : "や",
      buffer : ""
    })
  })
  it(" やま　→　山", function(){
    var result = buildState(
      {buffer: "", ignore: "", active: "やま", kana: "やま", value: "山"}
    )
    assert.deepEqual(result, {
      value : "山",
      active : "",
      ignore : "山",
      kana : "やま",
      buffer : "やま"
    })
  })
  it("あ山 -> あ山や", function(){
    var result = buildState(
      {buffer: "あやま", ignore: "あ山や", active: "", kana: "あやま", value: "あ山や"}
    )
    assert.deepEqual(result, {
      value : "あ山や",
      active : "や",
      ignore : "あ山",
      kana : "あやま",
      buffer : "あやま"
    })
  })
  
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