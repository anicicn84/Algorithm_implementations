// Max sum increasinf subsequence

// Given an array of n positive integers. 
// Write a program to find the sum of maximum sum subsequence 
// of the given array such that the integers in the 
// subsequence are sorted in increasing order. 
// Return that max sum and the numbers in the subsequence. 
// For example, if input is [1, 101, 2, 3, 100, 4, 5], 
// then output should be [106, [1 + 2 + 3 + 100]], 
// if the input array is [3, 4, 5, 10], 
// 	then output should be [22, [3 + 4 + 5 + 10]] and 
// if the input array is [10, 5, 4, 3], then output should be [10, [10]]

function maxSumIncreasingSubsequence(array) {
  const sequences = new Array(array.length);
	
	// to have something in this array in the beginning of our internal for loop
	const sums = [...array];
	
	// index of the greatest sum in the sums array
	let maxSumIdx = 0;
	
	for (let i = 0; i < array.length; i++) {
		let currentNum = array[i];
		for (let j = 0; j < i; j++) {
			otherNum = array[j];
			// strictly increasing subsequence, therefore <, not <=
			if (otherNum < currentNum && sums[i] <= sums[j] + currentNum) {
				sums[i] = sums[j] + currentNum;
				sequences[i] = j; // store the index here of the previous number involved in the sum
			}
		}
		if (sums[i] >= sums[maxSumIdx]) {
			maxSumIdx = i;
		}
	}
	return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)];
}

// currentIdx is maxIdx
const buildSequence = (array, sequences, currentIdx) => {
	let sequence = [];
	while (currentIdx !== undefined) {
		sequence.unshift(array[currentIdx]);
		currentIdx = sequences[currentIdx];
	}
	return sequence;
}

// Do not edit the line below.
exports.maxSumIncreasingSubsequence = maxSumIncreasingSubsequence;
