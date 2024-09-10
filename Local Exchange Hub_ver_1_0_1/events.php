<?php
header('Content-Type: application/json');

// Sample event data (this would normally come from a database)
$events = [
    ['name' => 'Community Picnic', 'date' => '2024-09-20'],
    ['name' => 'Local Art Show', 'date' => '2024-10-01'],
    ['name' => 'Language Exchange Meetup', 'date' => '2024-10-10']
];

echo json_encode($events);
?>
