// You're given 2 positive integers representing the height of a 
// staircase and the maximum number of steps that you can advance up
// the staircase at a time. Write a function that returns the number
// of ways in which you can climb the staircase. 
// For example, if you were given a staircase of height = 3 and
// maxSteps = 2 you could climb the staircase in 3 ways. You could
// take 1 step, 1 step, then 1 step, you could also take 1 step, then 
// 2 steps, and you could take 2 steps, then 1 step. 
// Note that maxSteps <= height will always be true.

// Sample input: height = 4, maxSteps = 2
// Sample output is 5, here are the possible ways:
// 1, 1, 1, 1
// 1, 1, 2
// 1, 2, 1
// 2, 1, 1
// 2, 2    ==> total 5 different ways

function staircaseTraversal(height, maxSteps) {
  // sliding window solution
	let currentNumberOfWays = 0;
	const waysToTop = [1];
	// <= height is to make sure we are including the height
	for (let currentHeight = 1; currentHeight <= height; currentHeight++) {
		// start of the previous window so that we can substract that value
		let startOfPreviousWindow = currentHeight - maxSteps - 1;
		let endOfWindow = currentHeight - 1; //we want to look at the previous value from this height
		if (startOfPreviousWindow >= 0) { // it is not in the negative area, left of 0
			currentNumberOfWays -= waysToTop[startOfPreviousWindow]; // remove the element from the left
																															// which got dropped fromt he left of the window
			// only then we can remove something from the left, otherwise nothing to remove
		}
		currentNumberOfWays += waysToTop[endOfWindow]; // the new value added from the right
		waysToTop.push(currentNumberOfWays); // current num of ways on the height we are on
	}
	
	return waysToTop[height];
}

// Do not edit the line below.
exports.staircaseTraversal = staircaseTraversal;
