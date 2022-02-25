// Sort stack
// Write a function that takes in an array of integers representing a
// stack, recursevely sorts the stack in place (does not create a 
// brand new array), and returns it.
// The array must be treated as a stack, with the end of the array as 
// the top of the stack. You are only allowed to push and pop. 

function sortStack(stack) {
	if (stack.length === 0) return stack;
  const value = stack.pop();
	sortStack(stack);
	insertVal(value, stack);
	
	return stack;
}

function insertVal(value, stack){
	// when do we push to stack
	if (stack.length === 0 || stack[stack.length - 1] <= value) {
		stack.push(value);
		return;
	}
	
	// otherwise if the val on top is greater than our current value
	const top = stack.pop();
	// pop the top problematic element and try to insert now
	insertVal(value, stack);
	// push the bigger top on top of the smaller element now pushed
	stack.push(top);
}

// Do not edit the line below.
exports.sortStack = sortStack;
