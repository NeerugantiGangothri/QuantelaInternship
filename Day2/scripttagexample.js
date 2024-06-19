<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>External JavaScript Example</title>
    <!-- Link to the external JavaScript file -->
    <script src="script.js" defer></script>
</head>
<body>
    <h1>External JavaScript Example</h1>
    <button onclick="showAlert()">Click Me!</button>
</body>
</html>

///Script.js
function showAlert() {
    alert("Button clicked!");
}
