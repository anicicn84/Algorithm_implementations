// Write an efficient program to find the sum of contiguous subarray 
// within a one-dimensional array of numbers that has the largest sum. 
// Example:
// array = [3,5,-9,1,3,-2,3,4,7,2,-9,6,3,1,-5,4]
// Sample output: 19 because the subarray is [1,3,-2,3,4,7,2,-9,6,3,1]

function kadanesAlgorithm(array) {
	let maxSum = array[0];
	let maxEndingHere = array[0];
	for (let i = 1; i < array.length; i++) {
		// previous maxEnding and this number, or just this number (reset)
		maxEndingHere = Math.max(maxEndingHere + array[i], array[i]);
		
		// update the maxSum so far
		maxSum = Math.max(maxSum, maxEndingHere);
	}
	
	return maxSum;
}

// Do not edit the line below.
exports.kadanesAlgorithm = kadanesAlgorithm;