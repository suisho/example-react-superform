var Marty = require("marty")
module.exports = Marty.createStateSource({
  type : 'http',
  getAddress : function(zipcode){
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
    
  }
})
