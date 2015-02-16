var Marty = require("marty")
var ZipcodeSourceActionCreators = require("../action/ZipcodeSourceActionCreators")
module.exports = Marty.createStateSource({
  type: 'http',
  getAddress: function (zipcode) {
    ZipcodeSourceActionCreators.fetchData({
      pref : "東京都",
      addr1 : "",
      addr2 : ""
    })
  }
})

