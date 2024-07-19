class CustomRangeError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomRangeError";
    }
  }
  
  function checkNumberInRange(number, min, max) {
    if (number < min || number > max) {
      throw new CustomRangeError(`Number ${number} is out of range (${min} - ${max}).`);
    }
    console.log("Number is in range");
  }
  
  try {
    checkNumberInRange(10, 1, 5);
  } catch (error) {
    if (error instanceof CustomRangeError) {
      console.error("Range error:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
  