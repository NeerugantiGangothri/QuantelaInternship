// JavaScript has a built-in Error object that provides information about errors that occur during runtime. 
// You can also create custom error objects by extending the built-in Error class.

try {
    throw new Error("Custom Error!");
  } catch (error) {
    console.log(error.name); // Output: Error
    console.log(error.message); // Output: Something went wrong!
  }
  

class CheckCondition extends Error { 
	constructor(msg) { 
		super(msg); 
	} 
} 

try { 
	if (10 != 20) 
		throw new CheckCondition("10 is not equal to 20"); 
} 
catch (err) { 
	console.error(err); 
}
