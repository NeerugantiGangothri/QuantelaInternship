let grade = "B";
let message;

switch (grade) {
    case "A":
        message = "Excellent";
        break;
    case "B":
        message = "Good job";
        break;
    case "C":
        message = "Passed";
        break;
    case "D":
        message = "Not so good";
        break;
    case "F":
        message = "Failed";
        break;
    default:
        message = "Unknown grade";
        break;
}

console.log("Your grade is " + grade + ". " + message);
