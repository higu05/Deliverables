document.addEventListener('DOMContentLoaded', () => {
    // Handle events for the matching form
    const matchForm = document.getElementById('matchForm');
    
    matchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selectedInterest = document.getElementById('interest').value;
        
        fetch('match.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interest: selectedInterest })
        })
        .then(response => response.json())
        .then(data => {
            alert(`You have been matched with: ${data.match}`);
        })
        .catch(error => console.error('Error:', error));
    });
    
    // Fetch events dynamically
    fetch('events.php')
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById('eventList');
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.innerHTML = `<h4>${event.name}</h4><p>${event.date}</p>`;
                eventList.appendChild(eventItem);
            });
        })
        .catch(error => console.error('Error:', error));
});
