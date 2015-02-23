var Marty = require("marty")

var UsersAPI = Marty.createStateSource({
  type: 'http',
  getUser() {
    /*this.request({
      url : "http://127.0.0.1:3000/user?callback=foo",
      contentType : 'application/jsonp'
    }).then(function (res) {
      console.log(res)
    });*/
  },
  postUser(user){
    mockServer.postUser(user, function(body){
    })
  }
})
//UsersAPI.getUser()
