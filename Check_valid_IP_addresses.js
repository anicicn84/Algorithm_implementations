// Valid IP addresses
// You are given a string of length 12, or smaller, containing only digits.

// Write a function that returns all the possible IP addresses thant can be
// created by inserting three dots in the string.

// An IP address is a sequence of four positive integers that are separated
// by dots, where each individual integer is within the range 0 - 255, inclusive.

// An IP address isn't valid if any of the individual integers contains
// leading zeroes. For example, "192.168.0.1" is valid IP address, but
// "192.168.0.01" is not, because it contains "01".
// Another example of a valid IP address is "99.1.1.10", conversely 
// "991.1.1.0" is not valid because "991" is greater than 255. 

// Function should return all of the valid IP addresses in string format
// and in no particular order. If no valid IP addresses can be created 
// from the string, function should return an empty list. 

// O(1) time & space complaxity, since IP is always up to 12 characters

function validIPAddresses(string) {
	// all possible found ips to return
  const ipAddressesFound = []; 
	// all of the possible positions of our periods
	// 4 is the valid case, string.length in min is used for strings
	// that have invalid length (0, 1, 2, 3) not to have index error
	for (let i  = 1; i < Math.min(string.length, 4); i++)	{
		//keep track of the ip address parts that we have
		const currentIpAddressParts = ['', '', '', ''];
		// this will define our 1st part
		currentIpAddressParts[0] = string.slice(0, i);
		// make sure this 1st part is valid
		// if it is not valid move point to some other place
		if (!isValid(currentIpAddressParts[0])) continue; 
		
		// similar rationale as before, index checking of a string
		// if we arte at the end, like in "19216813" -> 192.168.13 
		// then string.length - i is 2, so this is the min and 
		// for loop should not go beyond, this is right boundary check
		for (let j = i+1; j < i + Math.min(string.length - i, 4); j++) {
			// now the second ip part
			// to the left of i is where the 1st period ends
			currentIpAddressParts[1] = string.slice(i, j); // string[i:j)
			// if it is not valid move point to some other place
			// continue internal for loop in charge for this part
			if (!isValid(currentIpAddressParts[1])) continue; 
			// now the 3rd point part
			for (let k = j+1; k < j + Math.min(string.length - j, 4); k++) {
				currentIpAddressParts[2] = string.slice(j, k); // string[j:k)
				currentIpAddressParts[3] = string.slice(k); // string[k:end)
				if (isValid(currentIpAddressParts[2]) && isValid(currentIpAddressParts[3])){
					// after 1st and 2nd part, if the 3rd and 4th part are valid
					// combine them and populate the results array
					ipAddressesFound.push(currentIpAddressParts.join('.'));
				} 
			}
		}
	}
	return ipAddressesFound;
}

function isValid(string) {
	const stringAsInt = parseInt(string);
	// check if it is out of bounds
	if (stringAsInt > 255) return false;
	
	// remove any trailing zeroes, like 001, or 01 in ip like 192.168.01.1
	// 01 parsed to int will be just 1 and will have a different
	// length than it's string versoin (len 1 vs len 2)
	// if the lengths are the same then this is a valid ip part
	// So, bacisally, check for leading zeroes
	return string.length === stringAsInt.toString().length;
}

// Do not edit the line below.
exports.validIPAddresses = validIPAddresses;
