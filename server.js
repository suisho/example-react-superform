var beefy = require('beefy')
var Hapi = require('hapi');
var browserify = require('browserify');
var reactify = require("reactify")

var b = beefy({
  entires :['form.jsx'],
  live : true,
  bundlerFlags :['-t', '[ reactify --es6 ]']
})

var server = Hapi.createServer('localhost', 3000, {
  //cors : true
})

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

// mock
var user = {
  firstName : "yamada",
  lastName : "tarou"
}


server.route({
  method: 'GET',
  path: '/js/{path*}',
  handler: function(request, reply){
    var b = browserify([ './js/' + request.params.path.replace(".js", ".jsx") ])
    b.transform(reactify)
    b.bundle(function(err, data){
      console.log(err)

      reply(data).type('text/javascript')
    })
  }
})

server.route({
  method: 'GET',
  path: '/user',
  handler : function(request, reply){
    reply(user)
  },
  config:{
    jsonp: "callback"
  }
})
server.route({
  method: 'POST',
  path: '/user',
  handler: function (request, reply) {
    reply(user);
  },
  config :{
    validate : {
    }
  }
});

server.route({
  method: 'GET',
  path: '/{filename?}',
  handler: {
    file: function (request) {
      return request.params.filename;
    }
  }
});