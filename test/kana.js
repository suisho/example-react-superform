var assert = require("power-assert")
var kana = require("../js/lib/kana")
describe("kana", function(){
  it("extracting kana", function(){
    var result = kana("あああ山本")
    assert.equal("あああ", result)
  })
  
  describe("to katakana", function(){
    it("正常系", function(){
      var result = kana.toKatakana("あぅん")
      assert.equal("アゥン", result)
    })
    it("ひらがな以外をど含む場合", function(){
      var result = kana.toKatakana("あぅん鬼acdb")
      assert.equal("アゥン鬼acdb", result)
    })
  })
})