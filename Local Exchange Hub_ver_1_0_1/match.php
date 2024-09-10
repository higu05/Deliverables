<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$interest = $data['interest'];

// Sample matches based on interest (this would normally be pulled from a database)
$matches = [
    'language' => 'John Doe - English & Japanese Exchange',
    'cooking' => 'Maria Gomez - Italian Cooking Lessons',
    'sports' => 'Mark Smith - Weekend Football',
    'arts' => 'Emily Davis - Pottery & Crafts'
];

$response = ['match' => $matches[$interest]];

echo json_encode($response);
?>
