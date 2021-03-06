// Given a value V, if we want to make a change for V cents, 
// and we have an infinite supply of each of C = { C1, C2, .., Cm} 
// valued coins, what is the minimum number of coins to make the 
//change? If it’s not possible to make a change, return -1.

// Examples:  

// Input: coins[] = {25, 10, 5}, V = 30
// Output: Minimum 2 coins required
// We can use one coin of 25 cents and one of 5 cents 

// Input: coins[] = {9, 6, 5, 1}, V = 11
// Output: Minimum 2 coins required
// We can use one coin of 6 cents and 1 coin of 5 cents

function minNumberOfCoinsForChange(n, denoms) {
  const numOfCoins = new Array(n+1).fill(Infinity);
	numOfCoins[0] = 0;
	for (const denom of denoms){
		for (let amount = 0; amount < numOfCoins.length; amount++) {
			if (denom <= amount) {
				numOfCoins[amount] = Math.min(numOfCoins[amount], 1 + numOfCoins[amount - denom]);
			}
		}
	}
	return numOfCoins[n] !== Infinity ? numOfCoins[n] : -1;
}

// Do not edit the line below.
exports.minNumberOfCoinsForChange = minNumberOfCoinsForChange;
