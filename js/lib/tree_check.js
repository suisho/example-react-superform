var extend = require("extend")
function traverseCheck(data, checkFunc, checkProperty, childrenProperty){
  var children = data[childrenProperty]
  if(children){ // 子があるなら子の状態を上書き
    var childTraverse = children.map(function(child){
      return traverseCheck(child, checkFunc, checkProperty, childrenProperty)
    })
    data[checkProperty] = childTraverse[checkFunc](function(child){ return child })
  }

  return data[checkProperty]
}

var treeCheck = function(tree, checkFunc, opts){
  var clonedTree = extend(tree, {}) // copy
  var options = extend({
    childrenProperty : "children",
    checkProperty : "checked"
  }, opts)
  traverseCheck(clonedTree, checkFunc, options.checkProperty, options.childrenProperty)
  return clonedTree
}

module.exports.every = function(tree, opts){
  return treeCheck(tree, "every", opts)
}

module.exports.some = function(tree, opts){
  return treeCheck(tree, "some", opts)
}
