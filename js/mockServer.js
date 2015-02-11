var mockServer = {
  postUser : function(user, cb){
    var err = []
    if(!user.name){
      err.firstName = "User name is required"
    }
    cb(null, {
      error : err
    })
  }
}
module.exports = mockServer