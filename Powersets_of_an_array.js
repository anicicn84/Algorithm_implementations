// Create powersets
// Like for [1, 2, 3] the result is
// [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

function powerset(array) {
  const subsets = [[]];
	for (const elem of array) {
		// this is gonna change as we add elements, 
		// make sure to read it's size that many times as 
		// many elements we have in an array
		// to prevent the infinite loop.
		const subsetLen = subsets.length;
		for (let i = 0; i < subsetLen; i++) {
			subsets.push(subsets[i].concat(elem));
		}
	}
	return subsets;
}

// Do not edit the line below.
exports.powerset = powerset;
