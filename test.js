
describe("ZipcodeRepository", function(){
  it("getAddress", function(done){
    var ZipcodeRepository = require("./js/ZipcodeRepository")
    ZipcodeRepository.getAddress("0000001", function(a){
      console.log(a)
      done()
    })
  })
})
