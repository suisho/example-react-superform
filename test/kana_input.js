var assert = require("power-assert")
var buildState = require("../js/view/build_kana_state.js")
describe("kana", function(){
  it("success", function(){
    var result = buildState({
      value : "あ",
      active : "",
      buffer: "",
    })
    assert.deepEqual(result, {
      value : "あ",
      active : "あ",
      kana : "あ",
      buffer: "",
    })
    //
    var result = buildState({
      value : "あい",
      active : "あ",
      kana : "あ",
      buffer: "",
    })
    assert.deepEqual(result, {
      value : "あい",
      active : "あい",
      kana : "あい",
      buffer: "",
    })
  })
  it("remove", function(){
    var result = buildState({
      value : "あ",
      active : "あい",
      kana : "あい",
      buffer: "",
    })
    assert.deepEqual(result, {
      value : "あ",
      active : "あ",
      kana : "あ",
      buffer: "",
    })
  })
  it("buffering", function(){
    var result = buildState({
      value : "山本",
      active : "やまもと",
      kana : "やまもと"
    })
    assert.deepEqual(result, {
      value : "山本",
      active : "",
      ignore : "山本",
      kana : "やまもと",
      buffer : "やまもと"
    })
  })
  it("buffering removed", function(){
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
  it("buffering step2", function(){
    var result = buildState({
      value : "山本たろ",
      active : "",
      ignore : "山本",
      kana : "やまもと",
      buffer : "やまもと"
    })
    assert.deepEqual(result, {
      value : "山本たろ",
      active : "たろ",
      ignore : "山本",
      kana : "やまもとたろ",
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
})