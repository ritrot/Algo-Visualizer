export class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = 0;
      this.y = 0;
      this.highlight = false;
    }
  }
  
  // Insert and return both the updated root and the node inserted
  export function insertNode(root, val) {
    const newRoot = cloneTree(root);
    let insertedNode = null;
  
    function insert(node, val) {
      if (!node) {
        insertedNode = new TreeNode(val);
        insertedNode.highlight = true;
        return insertedNode;
      }
      if (val < node.value) {
        node.left = insert(node.left, val);
      } else{
        node.right = insert(node.right, val);
      }
      return node;
    }
  
    const updatedRoot = insert(newRoot, val);
    return updatedRoot;
  }
  
  // Cloner
  function cloneTree(node) {
    if (!node) return null;
    const newNode = new TreeNode(node.value);
    newNode.left = cloneTree(node.left);
    newNode.right = cloneTree(node.right);
    return newNode;
  }
  