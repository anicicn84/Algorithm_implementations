// Spiral matrix traversal
// Example:
//  1  2  3  4  5
// 14 15 16 17  6
// 13 20 19 18  7
// 12 11 10  9  8

function spiralTraverse(array) {
 	let startRow = 0;
	let startCol = 0;
	let endRow = array.length - 1;
	let endCol = array[0].length - 1;
	
	const result = [];
	while (startRow <= endRow && startCol <= endCol) {
		// to the right
		for (let i = startCol; i <= endCol; i++) {
			result.push(array[startRow][i]);
		}
		
		// down
		for (let i = startRow + 1; i <= endRow; i++) {
			result.push(array[i][endCol]);
		}
		
		// go to the left
		for (let i = endCol - 1; i >= startCol; i--) {
			// if there is just one row left in this case then 
			// it is covered above, we must not go down, since there is no down, 
			// and then left, example:
			//  1  2  3  4
			// 10 11 12  5
			//  9  8  7  6 -> 11 and 12 are traversed in the right go
			if (startRow === endRow) break;
			result.push(array[endRow][i]);
		}
		
		// go up
		for (let i = endRow - 1; i > startRow; i--) {
			// if there is just one row left in this case then 
			// it is covered above, we must not go left, since there is no left,
			// and then up, example:
			//  1  2  3
			// 10 11  4
			//  9 12  5
			//  8  7  6 -> 11 and 12 are traversed in the down go 
			if (startCol === endCol) break;
			result.push(array[i][startCol]);
		}
		
		startCol++;
		startRow++;
		endCol--;
		endRow--;
	}
	
	return result;
}

// Do not edit the line below.
exports.spiralTraverse = spiralTraverse;
