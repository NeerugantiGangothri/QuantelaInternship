class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthenticationError";
    }
  }
  
  function authenticateUser(username, password) {
    const validUsername = "admin";
    const validPassword = "1234";
  
    if (username !== validUsername || password !== validPassword) {
      throw new AuthenticationError("Invalid username or password.");
    }
    console.log("User authenticated successfully");
  }
  
  try {
    authenticateUser("admin", "wrongpassword");
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error("Authentication error:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
  