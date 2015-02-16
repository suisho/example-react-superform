var Marty = require("marty")
var UserConstants = require("../constant").user
module.exports = Marty.createStore({
  handlers : {
    getAddress : UserConstants.ADDR_FROM_ZIPCODE
  },
  getInitialState(){
    return {
      firstName : null,
      lastName : null,
      zipcode : null,
      pref : null,
      addr1 : null,
      addr2 : null
    }
  },
  getAddress(pref, addr1, addr2){
    this.state.pref = pref
    this.state.addr1 = addr1
    this.state.addr2 = addr2
    this.hasChanged()
  },
  postUser(user){
    mockServer.postUser(user, function(err, body){
    })
  }
})