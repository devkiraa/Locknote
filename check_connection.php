<?php
// Create a database connection (replace with your database credentials)
$servername = "sql211.infinityfree.com";
$username = "if0_35085005";
$password = "z93UAb75vWW";
$dbname = "if0_35085005_locknote";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "error";
} else {
    echo "success";
}

$conn->close();
?>
