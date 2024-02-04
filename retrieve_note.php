<?php
$key = $_POST['key'];

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

// Query the database to retrieve the note based on the key
$sql = "SELECT note FROM notes WHERE code = '$key'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['note'];
} else {
    echo 'not_found';
}

$conn->close();
?>
