// Longest peak length

// Write a fucntion that takes an array of integers and returns the length of the longest peak
// in the array. A peak is defined as adjacent integers in the array that are strictly increasing
// until they reach a tip (the highest value in the peak), at which point they become strictly
// decreasing. At least 3 integers are required to form a peak.
// For example, the integers 1,4,10,2 form a peak, but the integers 4,0,10 don't and neither do
// the integers 1,2,2,0. Similarly, the integers 1,2,3 don't form a peak because there aren't any
// strictly decreasing integers after the 3.

// Sample input: 
// array = [1,2,3,3,4,0,10,6,5,-1,-3,2,3]
// Sample output:
// 6 because of the peak 0,10,6,5,-1,-3


function longestPeak(array) {
  let longestPeakLen = 0;
  // the tip has to have strictly smaller values on the left and right
	let idx = 1; // starting index to compare to prev and next val
	while (idx < array.length - 1) {
		// find out if the number at current idx is a peak
		const isPeak = array[idx-1] < array[idx] && array[idx] > array[idx+1];
		if (!isPeak) {

			// if we do not have a peak there is nothing else to do, move on
			// we are not gonna be expanding to the left and to the right
			idx++;
			continue;
		}
		// but if it is a peak see the length and keep track of surroundings
		// previous one was smaller (idx-1) since this is a peak
		// so no need to check it, it is always true < array[idx]
		let leftPeakIdx = idx - 2;
		while (array[leftPeakIdx] < array[leftPeakIdx + 1] && leftPeakIdx >=0){
			leftPeakIdx--;
		}
		
		// now check the right index up to where it goes
		// again, idx+1 would be smaller since this is a peak, no need to check
		let rightPeakIdx = idx + 2;
		
		// now check this one against the previous one and all the next ones
		while (array[rightPeakIdx] < array[rightPeakIdx - 1] 
					 && rightPeakIdx < array.length){
			rightPeakIdx++;
		}
		const currPeakLen = rightPeakIdx - leftPeakIdx - 1;
		longestPeakLen = Math.max(longestPeakLen, currPeakLen);
		// no need to go idx++ since those numbers are smaller so far
		// they are not part of the peak, we can continue where we have left off
		idx = rightPeakIdx;
		
		// Note: Tests would pass even with idx++ but it is unecessary work.
	}
	
	return longestPeakLen;
}

// Do not edit the line below.
exports.longestPeak = longestPeak;
