// alert dialog
alert("Hell world!");

// prompt dialog
let name = prompt("Please enter your name:", "Gangothri");

if (name) {
    console.log("Hello, " + name + "!");
} else {
    console.log("No Name entered");
}

// confirm dialog
let result = confirm("Do you want to proceed?");

if (result) {
    console.log("User clicked OK");
} else {
    console.log("User clicked Cancel.");
}

