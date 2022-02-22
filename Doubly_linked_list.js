// This is an input class. Do not edit.
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Feel free to add new properties and methods to the class.
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(node) {
    if (this.head === null) {
			// meaning the linked list is empty, otherwise head == tail
			this.head = node;
			this.tail = node;
			return;
		}
		this.insertBefore(this.head, node); // goes to the left, therefore before
  }

  setTail(node) {
    if (this.tail === null) {
			// reuse the method that does the same thing like in setHead in the 1st if condition
			// setting the head to node and tail, too, since the list is empty
			this.setHead(node)
			return;
		}
		this.insertAfter(this.tail, node);
  }

  insertBefore(node, nodeToInsert) {
    // if we are dealing with the linked list with one node => nothing to insert
		if (this.head === nodeToInsert && this.tail === nodeToInsert) return;
		
		// remove the node if it is in the linked list 
		this.remove(nodeToInsert);
		nodeToInsert.prev = node.prev;
		nodeToInsert.next = node;
		
		// now we update the bindings of the surrounding nodes
		if (node.prev === null) { // we are dealing with the head and we should update it
			this.head = nodeToInsert;
		} else {
			node.prev.next = nodeToInsert;
		}
		node.prev = nodeToInsert;
  }

  insertAfter(node, nodeToInsert) {
    // the same condition as in insertBefore
		if (this.tail === nodeToInsert && this.head === nodeToInsert) return;
		this.remove(nodeToInsert);
		nodeToInsert.prev = node;
		nodeToInsert.next = node.next;
		
		if (node.next === null) {
			this.tail = nodeToInsert;
		} else {
			// not a tail, update the next node
			node.next.prev = nodeToInsert;
		}
		node.next = nodeToInsert;
  }

  insertAtPosition(position, nodeToInsert) {
    if (position === 1) { //add to the 1st position, so the head
			this.setHead(nodeToInsert);
			return;
		}
		
		let node = this.head;
		let currentPos = 1; // we need to keep track of the current position to know where to insert
		while(node !== null && currentPos !== position) {
			node = node.next;
			currentPos++;
		}
		if (node !== null) { // we are not at the tail, somewhere in the middle
			this.insertBefore(node, nodeToInsert);
		} else { // we are at the tail, at the end of the linked list, insert after the tail
			this.setTail(nodeToInsert);
		}
  }

  removeNodesWithValue(value) {
    let node = this.head;
		while(node !== null){
			// save the value if needs to be removed
			const nodeToBeRemoved = node;
			
			// previous node state has been saved in case of removal, 
			// this is used for further traversal to remove all of the 
			// remaining nodes with the same value
			node = node.next;
			if (nodeToBeRemoved.value === value) this.remove(nodeToBeRemoved);
		}
  }

  remove(node) {
		// 1st just updating the edge cases, head and tail, or both if the node is head & tail
		// at the same time
    if (node === this.head) this.head = this.head.next;
		if (node === this.tail) this.tail = this.tail.prev;
		
		// then remove it's bindings
		this.removeNodeBindings(node);
  }

  containsNodeWithValue(value) {
		let node = this.head;
    while(node !== null && node.value !== value) {
			node = node.next;
		}
		return node !== null;
  }
	
	removeNodeBindings(node) {
		if (node.prev !== null) node.prev.next = node.next;
		if (node.next !== null) node.next.prev = node.prev;
		node.prev = null;
		node.next = null;
	}
}


// Do not edit the lines below.
exports.Node = Node;
exports.DoublyLinkedList = DoublyLinkedList;
