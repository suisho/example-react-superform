var Marty = require("marty")
var UserConstants = require("../constant").user

module.exports = Marty.createStore({
  handler : {
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
  getAddress(address){
    this.state.pref = address.pref
    this.state.addr1 = address.addr1
    this.state.addr2 = address.addr2
    this.hasChanged()
  },
  postUser(user){
    mockServer.postUser(user, function(err, body){
    })
  }
})