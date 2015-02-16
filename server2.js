var wzrd = require('wzrd')
var minimist = require('minimist')

var argv = "js/form.jsx:build.js -- -t [ reactify --es6 ]"
wzrd.http(argv).listen(port, listening)