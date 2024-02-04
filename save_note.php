<?php
$key = $_POST['key'];
$note = $_POST['note'];

// Database connection settings
$servername = "sql211.infinityfree.com";
$username = "if0_35085005";
$password = "z93UAb75vWW";
$dbname = "if0_35085005_locknote";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Escape the input to prevent SQL injection (better to use prepared statements)
$key = $conn->real_escape_string($key);
$note = $conn->real_escape_string($note);

// Check if the key exists in the database
$sql = "SELECT COUNT(*) AS count FROM notes WHERE code = '$key'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['count'] > 0) {
        // Key exists, update the existing note
        $sql = "UPDATE notes SET note = '$note' WHERE code = '$key'";
    } else {
        // Key doesn't exist, insert a new row
        $sql = "INSERT INTO notes (code, note) VALUES ('$key', '$note')";
    }
}

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error";
}

$conn->close();
?>
