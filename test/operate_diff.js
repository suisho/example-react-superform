var assert = require("power-assert")
var operateDiff = require("../js/lib/operate_diff")
describe("operateDiff", function(){
  it("isAddeddDiff", function(){
    assert.equal(true, operateDiff.isAddedDiff("山田", "山田た"))
    assert.equal(false, operateDiff.isRemovedDiff("山田", "山田た"))
    assert.equal(false, operateDiff.isConvertedDiff("山田", "山田た"))
  })
  it("isRemovedDiff", function(){
    assert.equal(false, operateDiff.isAddedDiff("山田た", "山田"))
    assert.equal(true, operateDiff.isRemovedDiff("山田た", "山田"))
    assert.equal(false, operateDiff.isConvertedDiff("山田た", "山田"))
  })
  it("isConvertedDiff", function(){
    assert.equal(false, operateDiff.isAddedDiff("山田たろう", "山田太郎"))
    assert.equal(false, operateDiff.isRemovedDiff("山田たろう", "山田太郎"))
    assert.equal(true, operateDiff.isConvertedDiff("山田たろう", "山田太郎"))
  })
})