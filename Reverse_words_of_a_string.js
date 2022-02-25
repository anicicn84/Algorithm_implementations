// Write a function that takes in a string of words separated by one or more whitespaces
// and returns a string that has these words in reverse order. For example, given 
// "nikola is great", the function should return "great is nikola".

// For this problem, a word can contain special characters, punctuation and numbers. 
// The words in the string will be separated by one or more whitespaces, and the reversed
// string must contain the same whitespaces as the original string. For example, given the string
// "whitesapces      4" you should be expected to return "4      whitespaces".

// Note that you are not allowed to use any built-in split or reverse methods/functions. 
// However, you are allowed to use a built-in join method/function.
// Also, note that the input string isn't guaranteed to always contain words. 

// Sample input: "Nikola is the best!"
// Sample output" "best! the is Nikola"

// O(n) time & space complexity

function reverseWordsInString(string) {
	// find all of the words & all of the spaces between them, as separate words, so to say
  const words = [];
	let startOfWord = 0;
	for (let idx = 0; idx < string.length; idx++) {
		const currentChar = string[idx];
		if (currentChar === ' ') { // that means we have found the word so far
			words.push(string.slice(startOfWord, idx)); // [startIdx, idx)
			startOfWord = idx;
		} else if (string[startOfWord] === ' ') {
			// if the currentChar is not the space (else if clause), it is a normal char
			// this means if the start of the word is space, we need to add this space to the list
			words.push(' ');
			// in the next iteration if the start of the word is another space, we add another space to the list
			
			// only in these 2 cases we set startOfWord = idx
			// if we traverse normal (non-space) chars startOfWord remains the same
			startOfWord = idx;
		}
	}
	// without this last word in the string will never be added, since we lack
	// the last empty space which was a condition to push
	// so ending word is the edge case it needs to be covered. 
	words.push(string.slice(startOfWord));
	
	reverseList(words);
	return words.join(''); // convert list to one unique string
}

// this reverses the list in place, just using temp variable each time
function reverseList(list){
	// assigne 2 variables at the same time
	let start = 0, end = list.length - 1;
	while (start < end) {
		// swap the starting and ending list element
		const temp = list[start]
		list[start] = list[end];
		list[end] = temp;
		start++;
		end--;
	}
}

// Do not edit the line below.
exports.reverseWordsInString = reverseWordsInString;
