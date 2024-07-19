class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  function validateUser(user) {
    if (!user.name) {
      throw new ValidationError("Name is required.");
    }
    if (user.age < 18) {
      throw new ValidationError("User must be at least 18 years old.");
    }
  }
  
  try {
    validateUser({ age: 16 });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation error:", error.message);
    } else {
      console.error("Unknown error:", error.message);
    }
  }
  