var Marty = require("marty")
var UserConstants = require("../constant").user

module.exports = Marty.createActionCreators({
  fetchData : UserConstants.ADDR_FROM_ZIPCODE(function(address){
    this.dispatch(address.pref, address.addr1, address.addr2)
  })
})