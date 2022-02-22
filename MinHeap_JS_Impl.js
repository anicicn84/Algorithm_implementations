// MinHeap implementation in JavaScript

class MinHeap {
	constructor(array) {
		this.heap = this.buildHeap(array);
	}

	buildHeap(array) {
		const firstParentIdx = Math.floor((array.length - 2) / 2);
		for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
			this.siftDown(currentIdx, array.length - 1, array);
		}
		return array;
	}

	siftUp(currentIdx, heap) {

		// for the 1st one to start the loop
		let parentIdx = Math.floor((currentIdx - 1) / 2);

		while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
			this.swap(currentIdx, parentIdx, heap);
			currentIdx = parentIdx;
			parentIdx = Math.floor((currentIdx - 1) / 2);
		}
	}

	siftDown(currentIdx, endIdx, heap) {
		// always check the most left one
		let childOneIdx = 2 * currentIdx + 1;
		while(childOneIdx <= endIdx) {
			// check if we can get the 2nd child if it exists in an array, otherwise assign  1 to it
			const childTwoIdx = (2 * currentIdx + 2) <= endIdx ? 2 * currentIdx + 2 : -1; 

			// decide which child is smaller for the swapping procedure
			let childIndexToSwap;
			if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]){
				childIndexToSwap = childTwoIdx;
			} else {
				childIndexToSwap = childOneIdx;
			}

			// now check the parent to swap with which child in a MinHeap tree
			if(heap[currentIdx] > heap[childIndexToSwap]) {
				this.swap(currentIdx, childIndexToSwap, heap);

				// update the indices in the swapping process, not just array/heap elements
				currentIdx = childIndexToSwap;

				// update childOneIndex for a while loop to proceed
				childOneIdx = 2 * currentIdx + 1;
			} else {
				// skip this one since parent is in place when compared to it's children
				return;
			}

		}
	}

	insert(value) {
		this.heap.push(value);
		this.siftUp(this.heap.length - 1, this.heap);
	}

	remove() {
		this.swap(0, this.heap.length - 1, this.heap);
		const valueToRemove = this.heap.pop(); // removes the last element in an array, ex-root so to say
		this.siftDown(0, this.heap.length - 1, this.heap);
		return valueToRemove;
	}

	peek() {
		return this.heap[0];
	}

	swap(i, j, heap) {
		const temp = heap[i];
		heap[i] = heap[j];
		heap[j] = temp;
	}
}

exports.MinHeap = MinHeap;