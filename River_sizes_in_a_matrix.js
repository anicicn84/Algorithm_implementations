// You are given a two-dimensional array of potentially 
// unequal height and width. It contains only 0s and 1s. 
// This array represents a map: 0s are land, and 1s are water. 
// A "river" on this map consists of any number of contiguous, 
// adjacent water squares, where "adjacent" means "above", "below", 
// "to the left of", or "to the right of" (that is, diagonal 
// squares are not adjacent). Write a function which returns 
// an array of the sizes of all rivers represented in the input 
// matrix. Note that these sizes do not need to be in any 
// particular order.

// For example:

// const input = [
//   [1, 0, 0, 1, 0],
//   [1, 0, 1, 0, 0],
//   [0, 0, 1, 0, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 1, 1, 0]
// ];

// riverSizes(input); // returns [1, 2, 2, 2, 5]


function riverSizes(matrix) {
	// an array of river sizes to be returned
  let sizes = [];
	
	// initialise out auxiliary matrix of visited nodes, all of them false by deafult
	const visited = matrix.map(row => row.map(elem => false));
	// now we need to visit every single node
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			// we skip traversing already visited nodes
			if (visited[i][j]) continue;
			// otherwise traverse this node, be it 0 or 1, doesn't matter
			
			// it needs to take i and j to know from which node to traverse
			// matrix to have the original matrix as a reference
			// sizes to populate it along the say
			// and visited to change it and use it for a reference
			traverseNode(i, j, matrix, visited, sizes);
		}
	}
	
	// we have finished with traversing nodes, so we can return this array
	return sizes;
}

function traverseNode(i, j, matrix, visited, sizes) {
	let currentRiverSize = 0; // potential new river, starting with size 0
	// we apply depth-first search here:
	
	// each value in this array is going to be a node that we have to explore
	// 1st node to be explored, later we will append more if there are some
	// this is like a stack, we push the neighboring values here with the value of 1
	const nodesToExplore = [[i, j]]; // indices of the matrix to be explored
	// while we still have nodes to explore
	while (nodesToExplore.length > 0) {
		// take the one from top/end, final value
		// we can call this since we just addded one element and we want to check it
		const currentNode = nodesToExplore.pop(); 
		// now take the current indices from stored indices node
		i = currentNode[0];
		j = currentNode[1];
		if (visited[i][j]) continue;
		visited[i][j] = true;
		
		if (matrix[i][j] === 0) continue; // if it is a piece of land skip it, marked as visited already
		// otherwise we are dealing with unvisited node and part of the river
		currentRiverSize++;
		// start exploring it's neighboring nodes, use helper function
		const unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
		// add all those neighbor indices i, j to the stack so that we can do depth-first search on them
		for (const neighbor of unvisitedNeighbors) {
			nodesToExplore.push(neighbor);
		}
	}
	
	// meaning - so far we have found one river in this nodes traversal, push it's size to the result
	if (currentRiverSize > 0) sizes.push(currentRiverSize);
}

function getUnvisitedNeighbors(i, j, matrix, visited) {
	// we have up to 4 unvisited neighbors
	const unvisitedNeighbors = []; // empty array to be returned
	
	// we are going to the neighbor above us if it exists and check if it is visited
	if (i > 0 && !visited[i-1][j]) {
		unvisitedNeighbors.push([i-1, j]); // append top neighbor/above us
	}
	
	// if we are not at the bottom row and we have unvisited node below us
	if (i < matrix.length - 1 && !visited[i+1][j]) {
		unvisitedNeighbors.push([i+1, j]); // append bottom neighbor/below us
	}
	
	// we are not in the left most column and have unvisted left neighbor
	if (j > 0 && !visited[i][j-1]) {
		unvisitedNeighbors.push([i, j - 1]); // append left neighbors
	}
	
	// we are not in the right most column and have unvisted right neighbor
	if (j < matrix[0].length-1 && !visited[i][j+1]) {
		unvisitedNeighbors.push([i, j + 1]); // append right neighbor
	}
	
	return unvisitedNeighbors;
}

// Do not edit the line below.
exports.riverSizes = riverSizes;
