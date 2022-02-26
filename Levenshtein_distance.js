// Levenshtein's distance
// Write a function that takes in two strings and returns the minimum number of edit operations
// that need to be performed on the first string to obtain the 2nd string. 
// There are 3 edit operations: insertion of char, deletion of it and substitution.
// Sample input: str1 = "abc", str2 = "yabd"
// Sample output: 2 -> insert "y"; sunstitute "c" for "d".

// Solution:

// we treat these columns as a substring
// from left to right 
// so, to go from an empty string to 'ya' we need 2 operations, like on the index (3, 1)
// in the given table 

//         0   1  2  3  4  -> indices
// indices |   |  |  |  |
//         v   v  v  v  v
//     ___________________
//     |  |""  y  a  b  d
//		 -------------------
// 0   |""| 0  1  2  3  4
//     -------------------
// 1   | a| 1  1  1  2  3
//     -------------------
// 2   | b| 2  2  2  1  2
//     -------------------
// 3   | c| 3  3  3  2  2    => return the last matrix element (2)

// Formula we can deduce from the table:
// 2D array is "edits table" -> called E, str1 is "abc", str2 is "yabd"
// if str1[row - 1] == str2[col - 1] then E[row][col] = E[row-1][col-1] which is back diagonally
// else E[row][col] = 1 + min(E[row][col-1], E[row-1][col], E[row-1][col-1])
// so we take the min of the 3 neighboring boxes in the else clause

function levenshteinDistance(str1, str2) {
  // initialize out 2D array
  // we can safely assume we are being passed valid strings
  const edits = [];
  // initialize all our rows and cols i == 0 and j == 0 to init values
  for (let i = 0; i < str2.length + 1; i++){ // +1 to account for an ""
    const row = []; // row to be populated in the next for loop
    for (let j = 0; j < str1.length + 1; j++) {
      // push 0, 1, 2, 3, 4, etc.
      row.push(j);
    }
    row[0] = i; // columns should also be 0, 1, 2, 3, 4, etc.
    edits.push(row);
  }
  
  // start building the rest of the table
  for (let i = 1; i < str2.length + 1; i++){ // +1 to account for an ""
    for (let j = 1; j < str1.length + 1; j++) {
      // now apply the formula from above in the comments
      // we shifted eveything by one due to our ""
      if (str2[i-1] == str1[j-1]) {
        edits[i][j] = edits[i-1][j-1]; // we look up diagonally since the char is the same
      } else {
        edits[i][j] = 1 + Math.min(edits[i][j-1], edits[i-1][j], edits[i-1][j-1]);
      }
    }
  }
  
  return edits[str2.length][str1.length];
}

// Do not edit the line below.
exports.levenshteinDistance = levenshteinDistance;
