function solveSudoku(board) {
  solvePartialSudoku(0, 0, board);
  return board;
}

function solvePartialSudoku(row, col, board) {
	// temp values we are going to alter, without changing the parameters
	let currentRow = row;
	let currentCol = col;
	
	if (currentCol === 9) { //we came to an end of a row
		//reset the col and update the row
		currentCol = 0;
		currentRow++;
		if (currentRow === 9) return true; // we came to a very end of the board
	}
	
	if (board[currentRow][currentCol] === 0) {
		return tryDigitsAtPosition(currentRow, currentCol, board);
	}
	
	// we never update a row position, solvePartialSudoku does this if the col
	// value is off limits (equals 9) 
	// so we always update col value by 1 to progress.
	return solvePartialSudoku(currentRow, currentCol + 1, board);
}

function tryDigitsAtPosition(row, col, board) {
	for (let digit = 1; digit < 10; digit++) {
		if (isValidAtPosition(digit, row, col, board)) {
			
			// some valid value that fits
			board[row][col] = digit;
			// try going on to solve, if not, recursive call stack will come here
			// eventually and continue where it left off
			// if okay, then this digit was a hit, return true
			// if not we do not want to return here, we need to reset the field first
			if (solvePartialSudoku(row, col + 1, board)) return true;
		}
	}
	
	// if digit does not fit, reset the field and go back
	// BACKPROPAGATE:
	board[row][col] = 0;
	return false;
}

function isValidAtPosition(value, row, col, board) {
	const rowIsValid = !board[row].includes(value);
	const colIsValid = !board.map(r => r[col]).includes(value);
	
	if (!rowIsValid || !colIsValid) return false;
	
	//subgrid checks
	const subgridRowStart = Math.floor(row / 3) * 3; // 5/3 = 1 and x3 = 3
	const subgridColStart = Math.floor(col / 3) * 3;
	for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
		for (let colIdx = 0; colIdx < 3; colIdx++) {
			const rowToCheck = subgridRowStart + rowIdx;
			const colToCheck = subgridColStart + colIdx;
			const existingVal = board[rowToCheck][colToCheck];
			if (value == existingVal) return false;
		}
	}
	return true;
}

// Do not edit the line below.
exports.solveSudoku = solveSudoku;
