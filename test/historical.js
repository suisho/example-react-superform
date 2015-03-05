var historical = require("../js/lib/historical")
var assert = require("assert")
describe("historical kana", function(){
  describe("山田太郎", function(){
    it("aa", function(){
      var kana = historical(["山田太郎", "山田太郎", "山田たろう", "山田たろ", "山田たｒ", "山田た", "山田ｔ", "山田", "山田", "やまだ", "やまｄ", "やま", "やｍ", "や", "ｙ"])
      //assert.equal(kana, "やまだたろう")
    })
  })
})
