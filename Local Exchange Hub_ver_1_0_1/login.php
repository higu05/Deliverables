<?php
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

// Simple user verification (replace with database query)
if ($username === 'user' && $password === 'password') {
    $_SESSION['loggedin'] = true;
    header('Location: index.html');
} else {
    echo 'Invalid credentials. Please try again.';
}
?>
