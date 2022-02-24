// Find minimum passes required to convert all negative values 
// in a matrix.
// Given an M × N matrix of integers whose each cell can 
// contain a negative, zero, or a positive value, 
// determine the minimum number of passes required to 
// convert all negative values in the matrix positive.


function minimumPassesOfMatrix(matrix) {
  const passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1; // we will have 1 more pass than required
}

function convertNegatives(matrix) {
	// in the beginning we want to find all of the positive positions
	// then we use them in the wile loop to convert numbers and 
	// add those to the new queue, swapping next and current queue
	let queue = getAllPositivePositions(matrix);
	
	// actual value we are interested in returning
	let passes = 0;
	while(queue.length > 0) {
		// Everytime the while loop hit is, we swap the queues
		let currentQueueSize = queue.length;
		while (currentQueueSize > 0) {
			const [currentRow, currentCol] = queue.shift(); // take the 1st added element
			
			// get the current element's neighbors from the matrix
			const adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
			for (const position of adjacentPositions) {
				const[row, col] = position; // some neighbor position of the current element
				if (matrix[row][col] < 0) { // neighbor of the current element is negative, convert it 
																		//and add it to the queue
					matrix[row][col] *= -1;
					queue.push([row, col]);  // push the indices as an array of 2 elements i, j
				} 
			}
			currentQueueSize--;
		}
		passes++;
	}
	
	return passes;
}

function containsNegative(matrix) {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] < 0) return true;
		}
	}
	
	return false;
}

function getAdjacentPositions(currentRow, currentCol, matrix) {
	const neighborPositions = [];
	if (currentRow > 0) neighborPositions.push([currentRow - 1, currentCol]);
	if (currentRow < matrix.length - 1) neighborPositions.push([currentRow + 1, currentCol]);
	if (currentCol > 0) neighborPositions.push([currentRow, currentCol - 1]);
	if (currentCol < matrix[currentRow].length - 1) neighborPositions.push([currentRow, currentCol + 1]);
	return neighborPositions;
}

function getAllPositivePositions(matrix) {
	const positions = [];
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] > 0) positions.push([i, j]);
		}
	}
	return positions;
}

// Do not edit the line below.
exports.minimumPassesOfMatrix = minimumPassesOfMatrix;

