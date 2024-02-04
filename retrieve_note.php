<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Invalid request method.');
}

// Input validation
$key = trim($_POST['key']);
if (empty($key) || strlen($key) > 100) {
    die('Invalid key.');
}

// Database connection settings
$servername = "sql211.infinityfree.com";
$username = "if0_35085005";
$password = "z93UAb75vWW";
$dbname = "if0_35085005_locknote";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement
$stmt = $conn->prepare("SELECT note FROM notes WHERE code = ?");

// Bind the parameter
$stmt->bind_param("s", $key);

// Execute the statement
$stmt->execute();

// Bind the result variable
$stmt->bind_result($note);

// Check if a row was found
if ($stmt->fetch()) {
    echo $note;
} else {
    echo 'not_found';
}

// Close the statement and the connection
$stmt->close();
$conn->close();
?>