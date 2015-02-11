

var UsersAPI = Marty.createStateSource({
  type: 'http',
  getUser: function () {
    /*this.request({
      url : "http://127.0.0.1:3000/user?callback=foo",
      contentType : 'application/jsonp'
    }).then(function (res) {
      console.log(res)
    });*/
  }
  postUser : function(user){
    mockServer.postUser(user, function(body){
    })
  }
})
//UsersAPI.getUser()
