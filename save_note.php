<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Invalid request method.');
}

// Input validation
$key = trim($_POST['key']);
$note = trim($_POST['note']);
if (empty($key) || strlen($key) > 100 || empty($note) || strlen($note) > 1000) {
    die('Invalid key or note.');
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
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM notes WHERE code = ?");

// Bind the parameter
$stmt->bind_param("s", $key);

// Execute the statement
$stmt->execute();

// Bind the result variable
$stmt->bind_result($count);

// Check if a row was found
if ($stmt->fetch()) {
    // Key exists, update the existing note
    if ($count > 0) {
        $sql = "UPDATE notes SET note = ? WHERE code = ?";
    } else {
        // Key doesn't exist, insert a new row
        $sql = "INSERT INTO notes (code, note) VALUES (?, ?)";
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);

    // Bind the parameters
    $stmt->bind_param("ss", $key, $note);

    // Execute the statement
    $stmt->execute();

    // Check for errors
    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "error";
    }

} else {
    echo "error";
}

// Close the statement and the connection
$stmt->close();
$conn->close();
?>