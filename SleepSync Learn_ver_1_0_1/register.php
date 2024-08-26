<?php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
    if ($conn->query($query) === TRUE) {
        header("Location: login.html");
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
