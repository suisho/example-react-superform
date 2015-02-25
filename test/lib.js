var assert = require("power-assert")
var util = require("util")
var treeFix = require("../js/lib/tree")
var travarse = require("traverse")
describe("tree", function(){
  var result = treeFix({
    "name" : "p",
    "checked" : true,
    "children" : [
      { "checked" : false ,
        "name": "A",
        "children" : [
            { "checked" : true, "name" : "A-1" },
            { "checked" : true,  "name" : "A-2"},
            { "checked" : true, "name" : "A-3" },
        ]
      },
      { "checked" : false, "name" : "B" },
      { "checked" : true ,
        "name": "C",
        "children" : [
            { "checked" : true, "name" : "C-1" },
            { "checked" : false,  "name" : "C-2"},
            { "checked" : true, "name" : "C-3" },
        ]
      },
    ]
  })
  // console.log(util.inspect(result, {depth:null}))
  var expect = { name: 'p',
    checked: false,
    children:
     [ { checked: true,
         name: 'A',
         children:
          [ { checked: true, name: 'A-1' },
            { checked: true, name: 'A-2' },
            { checked: true, name: 'A-3' } ] },
       { checked: false, name: 'B' },
       { checked: false,
         name: 'C',
         children:
          [ { checked: true, name: 'C-1' },
            { checked: false, name: 'C-2' },
            { checked: true, name: 'C-3' } ] } ] }
  var expectTraverse = travarse(result)
  travarse(expect).forEach(function(x){
    var exp = expectTraverse.get(this.path)
    if(typeof x === "object" && x["name"]){ // objet or array
      it(x["name"], function(){
        assert.deepEqual(exp, x)
      })
    }
  })
})