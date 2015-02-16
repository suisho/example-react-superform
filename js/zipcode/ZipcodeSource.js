var Marty = require("marty")
var ZipcodeSourceActionCreators = require("./ZipcodeSourceActionCreators")
module.exports = Marty.createStateSource({
  type: 'http',
  getAddress: function (zipcode) {
    var key = zipcode.substr(0,3)
    /*this.request({
      url : 'https://jpostal.googlecode.com/svn/trunk/json/' + key + ".json",
      method : 'GET',
      header : {
        "Access-Control-Allow-Credentials": true
      },
      contentType : 'application/javascript'
    }).then(function(res){
      console.log(res)
    })*/
    setTimeout(function(){
      ZipcodeSourceActionCreators.fetchData({
        pref : "東京都",
        addr1 : "品川区上大崎",
        addr2 : "スターバックス"
      })
    }, 500)
  }
})
