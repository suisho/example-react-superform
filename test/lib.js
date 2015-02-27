var assert = require("power-assert")
var util = require("util")

var treeCheck = require("../js/lib/tree_check")
var travarse = require("traverse")

// expectデータ生成用
function dump(data){
  console.log(util.inspect(data, {depth : null}))
}

var childrenFixtures = {
  allTrue : [
    {"checked" : true},
    {"checked" : true},
    {"checked" : true}
  ],
  allFalse : [
    {"checked" : false},
    {"checked" : false},
    {"checked" : false}
  ],
  mixed :[
    {"checked" : true},
    {"checked" : false},
    {"checked" : true},
    {"checked" : false},
    {"checked" : true}
  ]
}
describe("unit test", function(){
  describe("every", function(){
    var func = treeCheck.every
    it("all true", function(){
      var result = func({
        "checked" : false,
        "children" : childrenFixtures.allTrue
      })
      assert.equal(result.checked,true)
    })
    it("mixed", function(){
      var result = func({
        "checked" : true,
        "children" : childrenFixtures.mixed
      })
      assert.equal(result.checked, false)
    })
    it("all false", function(){
      var result = func({
        "checked" : true,
        "children" : childrenFixtures.allFalse
      })
      assert.equal(result.checked, false)
    })
  })
  describe("some", function(){
    var func = treeCheck.some
    it("all true ", function(){
      var result = func({
        "checked" : false,
        "children" : childrenFixtures.allTrue
      })
      assert.equal(result.checked,true)
    })
    it("mixed", function(){
      var result = func({
        "checked" : false,
        "children" : childrenFixtures.mixed
      })
      assert.equal(result.checked, true)
    })
    it("all false", function(){
      var result = func({
        "checked" : true,
        "children" : childrenFixtures.allFalse
      })
      assert.equal(result.checked, false)
    })
  })
  describe("set value", function(){
    it("set true", function(){
      var tree = {
        "checked" : false,
        "children" : childrenFixtures.allFalse
      }
      var result = treeCheck.set(tree, true, )
      assert.equal(result.checked, false)
    })
    it("set false", function(){
      
    })
  })
})


describe("large", function(){
  var fixture = {
    "name" : "p",
    "checked" : true,
    "children" : [
      { "checked" : false ,
        "name": "A",
        "children" : [
            { "checked" : true, "name" : "A-1" },
            { "checked" : true, "name" : "A-2"},
            { "checked" : true, "name" : "A-3" },
        ]
      },
      { "checked" : false, "name" : "B" },
      { "checked" : true ,
        "name": "C",
        "children" : [
            { "checked" : true, "name" : "C-1" },
            { "checked" : false, "name" : "C-2"},
            { "checked" : true, "name" : "C-3" },
        ]
      },
      { "checked" : true ,
        "name": "D",
        "children" : [
            { "checked" : false, "name" : "D-1" },
            { "checked" : false,  "name" : "D-2"},
        ]
      },
    ]
  }
  it("every( AND Expresion)", function(){
    var resultEvery = treeCheck.every(fixture)
    var expectEvery = {
      name: 'p',
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
              { checked: true, name: 'C-3' } ] },
         { checked: false,
           name: 'D',
           children:
            [ { checked: false, name: 'D-1' },
              { checked: false, name: 'D-2' } ] } ] }
    assert.deepEqual(expectEvery, resultEvery)
  })
  it("some ( OR Expression)", function(){
    var resultSome = treeCheck.some(fixture)
    var expectSome = {
      name: 'p',
      checked: true,
      children:
       [ { checked: true,
           name: 'A',
           children:
            [ { checked: true, name: 'A-1' },
              { checked: true, name: 'A-2' },
              { checked: true, name: 'A-3' } ] },
         { checked: false, name: 'B' },
         { checked: true,
           name: 'C',
           children:
            [ { checked: true, name: 'C-1' },
              { checked: false, name: 'C-2' },
              { checked: true, name: 'C-3' } ] },
         { checked: false,
           name: 'D',
           children:
            [ { checked: false, name: 'D-1' },
              { checked: false, name: 'D-2' } ] } ] }
    assert.deepEqual(expectSome, resultSome)
  })
})