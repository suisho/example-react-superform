var assert = require("power-assert")
var operateDiff = require("../js/lib/operate_diff")
describe("operateDiff", function(){
  it("isAddeddDiff", function(){
    assert.deepEqual(operateDiff("山田", "山田た"), {
      added :true, removed :false
    })
  })
  it("isRemovedDiff", function(){
    assert.deepEqual(operateDiff("山田た", "山田"), {
      added : false, removed : true
    })
  })
  it("isConvertedDiff", function(){
    assert.deepEqual(operateDiff("山田たろう", "山田太郎"), {
      added : true, removed : true
    })
  })
})