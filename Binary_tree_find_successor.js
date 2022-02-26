// Find successor in a binary tree

//Write a function that takes in a binary tree (where nodes have an additional pointer to their
// parent node) as well as a node contained in that tree and returns the given node's successor. 
// A node's successor is the next node to be visited (immediately after the given node) when
// traversing its tree using the in-order tree-traversal technique. A node has no successor if
// it's the last node to be visited in the in-order traversal. 
// If a node has no successor, the function should return null. 
// Each BinaryTree node has an integer value, a parent node, a left child node, and a right
// child node. Children nodes can either be BinaryTree nodes themselves or null. 


class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function findSuccessor(tree, node) {
  // we will consider 2 cases: when the node has and when it has not the right child
	if (node.right !== null) {
		return getLeftMostChild(node.right);
	}
	// we don't have the right child in this case
	// now we get right most parent
	return getRightMostParent(node);
}

function getLeftMostChild(node) {
	const nodeRight = node;
	if (nodeRight.left === null) return nodeRight;
	return getLeftMostChild(node.left);
}

function getRightMostParent(node) {
	let currentNode = node;
	// 1st do we have a parent? If we don't we don't, then, have a successor
	// 2nd check if we came from the right child of the parent's node
	// if we came from the right, like this suggests, we continue going up
	// if we came from the left, we break the loop and that is the parent node 
	// we are looking for, meaning it is not null and it is right most parent. 
	while(currentNode.parent !== null && currentNode.parent.right === currentNode) {
		currentNode = currentNode.parent;
	}
	// we have found our node we came from left and return it's parent
	return currentNode.parent;
}


// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.findSuccessor = findSuccessor;
