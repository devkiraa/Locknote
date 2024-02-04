<?php
// db.php
define('DB_HOST', 'sql211.infinityfree.com');
define('DB_USER', 'if0_35085005');
define('DB_PASS', 'z93UAb75vWW');
define('DB_NAME', 'if0_35085005_locknote');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// index.php
require_once 'db.php';

// Use prepared statements to prevent SQL injection attacks
$stmt = $conn->prepare("SELECT * FROM notes WHERE id = ?");
$stmt->bind_param("i", $note_id);
$note_id = 1;
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if the query was successful
if ($result) {
    // Fetch the data
    $note = $result->fetch_assoc();

    // Print the note
    echo $note['title'] . ': ' . $note['content'];

    // Close the statement and the result
    $stmt->close();
    $result->close();
} else {
    echo "Error: " . $conn->error;
}

// Close the database connection
$conn->close();
?>