<?php

function scrapeSpiciness($url) {
    // Simulate scraping logic (replace this with actual scraping logic)
    // For demonstration purposes, we're just returning dummy data.
    $dummy_data = [
        'mild' => 1000,
        'medium' => 5000,
        'hot' => 15000,
        'very hot' => 30000
    ];

    // Assume the URL contains a spiciness keyword (e.g., "hot")
    foreach ($dummy_data as $key => $value) {
        if (strpos(strtolower($url), $key) !== false) {
            return ['original_rating' => ucfirst($key), 'standardized_rating' => $value];
        }
    }

    return ['original_rating' => 'Unknown', 'standardized_rating' => 0];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $url = $_POST['url'] ?? '';

    if (empty($url)) {
        echo json_encode(['error' => 'No URL or product name provided.']);
        exit;
    }

    // Call the scrapeSpiciness function (this would be your scraping logic)
    $result = scrapeSpiciness($url);

    // Return the result as JSON
    echo json_encode($result);
}
?>
