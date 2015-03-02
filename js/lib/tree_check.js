var objectPath = require("object-path")
var extend = require("extend")



function traverseCheck(data, checkFunc, checkProperty, childrenProperty){
  var children = data[childrenProperty]
  if(children){ // check children
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

var propagateValue = function(tree, value, checkProperty, childrenProperty){
  var children = tree[childrenProperty]
  if(children){
    children.forEach(function(child){
      propagateValue(child, value, checkProperty, childrenProperty)
    })
  }
  tree[checkProperty] = value
}

var generatePath = function(path, childrenProperty){
  var result = [path[0]]
  for(var i = 1; i < path.length; i++){
    result.push(childrenProperty)
    result.push(path[i])
  }
  return result
}

module.exports.every = function(tree, opts){
  var result = treeCheck(tree, "every", opts)
  return result
}

module.exports.some = function(tree, opts){
  return treeCheck(tree, "some", opts)
}


module.exports.set = function(tree, path, value){
  var item = objectPath.get(tree, generatePath(path, "children") )
  propagateValue(item, value, "checked", "children")
  return tree
}
