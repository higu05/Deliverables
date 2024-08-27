document.getElementById('spiciness-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    if (url.trim() === '') {
        resultsDiv.innerHTML = '<p>Please enter a valid URL or product name.</p>';
        return;
    }

    // Fetch spiciness data from the backend PHP script
    fetch('scrape.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'url=' + encodeURIComponent(url)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            resultsDiv.innerHTML = `
                <h3>Results for "${url}"</h3>
                <p>Original Rating: ${data.original_rating}</p>
                <p>Standardized Rating (SHU): ${data.standardized_rating} SHU</p>
            `;
        }
    })
    .catch(error => {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
