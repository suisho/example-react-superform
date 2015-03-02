var assert = require("power-assert")
var kana = require("../js/lib/kana")
describe("kana", function(){
  it("extracting kana", function(){
    var result = kana("あああ山本")
    assert.equal("あああ", result)
  })
})