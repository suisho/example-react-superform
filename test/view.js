
describe("ZipcodeRepository", function(){
  it("getAddress", function(done){
    var ZipcodeRepository = require("../js/source/ZipcodeSource")
    ZipcodeRepository.getAddress("0000001", function(a){
      console.log(a)
      done()
    })
  })
})
