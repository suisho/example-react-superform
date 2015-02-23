var extend = require("extend")
function traverseCheck(data, checkProperty, childrenProperty){
  var children = data[childrenProperty]
  if(children){ // 子があるなら子の状態を上書き
    var childEvery = children.map(function(child){
      return traverseCheck(child, checkProperty, childrenProperty)
    })
    data[checkProperty] = childEvery.every(function(child){ return child })
  }
  return data[checkProperty]
}

module.exports = function(tree, opts){
  var clonedTree = extend(tree, {}) // copy
  var options = extend({
    childrenProperty : "children",
    checkProperty : "checked"
  }, opts)
  traverseCheck(clonedTree, options.checkProperty, options.childrenProperty)
  return clonedTree
}
