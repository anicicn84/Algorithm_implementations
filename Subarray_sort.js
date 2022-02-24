// Write a fucntion that takes in an array of at least 2 integers and
// that returns an array of starting and ending indices of the smallest
// subarray in the input array that needs to be sorted in-place
// in order for the entire input array to be sorted (in ascending order).
// If the input array is already sorted, the function should return [-1, -1]
// Sample input: [1,2,4,7,10,11,7,12,67,16,18,19]
// Sample output: [3,9]

function subarraySort(array) {
	// keep track of min and max numbers out of order in one go, without extra storing them
  let minOutOfOrder = Infinity;
	let maxOutOfOrder = -Infinity;
	
	for (let i = 0; i < array.length; i++) {
		let num = array[i];
		if (isOutOfOrder(i, num, array)) {
			minOutOfOrder = Math.min(minOutOfOrder, num);
			maxOutOfOrder = Math.max(maxOutOfOrder, num);
		}
	}
	
	// no number out of order, so no swaps happened
	// we could have compared also maxOutOfOrder with -Infinity
	if (minOutOfOrder === Infinity) return [-1, -1];
	 // now we find indices where to put them
	
	let leftIdx = 0;
	while (array[leftIdx] <= minOutOfOrder) {
		// we have found the starting index of the unsorted subarray
		leftIdx++;
	}
	
	let rightIdx = array.length - 1;
	while (array[rightIdx] >= maxOutOfOrder) {
		rightIdx--;
	}
	
	return [leftIdx, rightIdx];
}

function isOutOfOrder(i, num, array) {
	// i as index corresponds to number num in the array
	
	// 1st element should not be bigger than the next one
	if (i === 0) return num > array[i + 1];
	
	// last element should not be smaller than the previous one
	if (i === array.length - 1) return num < array [i-1];
	
	// the number at index i should not be smaller than the previous one
	// and bigger than the next one
	return num > array[i+1] || num < array[i-1];
}

// Do not edit the line below.
exports.subarraySort = subarraySort;
