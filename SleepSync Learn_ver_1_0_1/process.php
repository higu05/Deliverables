<?php
// Connect to database
$conn = new mysqli('localhost', 'username', 'password', 'database');

// Fetch word pairs
$sql = "SELECT * FROM words ORDER BY RAND() LIMIT 10";
$result = $conn->query($sql);

// Process user progress
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $word_id = $_POST['word_id'];
  $remembered = $_POST['remembered'];
  $user_id = $_SESSION['user_id'];

  $sql = "INSERT INTO progress (user_id, word_id, remembered) VALUES ($user_id, $word_id, $remembered)";
  $conn->query($sql);
}
?>
