const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

// Context to manage conversation state
let context = {};

// 1. Initialize Chatbot
function initChatbot() {
    addBotMessage("Hello! How can I help you today?");
}

// 2. Handle User Input
function handleUserInput() {
    const input = userInput.value.trim();
    userInput.value = '';
    return input;
}

// 3. Generate Response
function generateResponse(input) {
    let response = "I'm not sure I understand.";
    if (input.toLowerCase().includes('hello')) {
        response = "Hi there! How can I assist you?";
    } else if (input.toLowerCase().includes('how are you')) {
        response = "I'm just a bot, but I'm here to help!";
    }
    // Add more conditions for different responses
    return response;
}

// 4. Update Chat Log
function updateChatLog(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to bottom
}

// 5. Send Message
function sendMessage() {
    const userMessage = handleUserInput();
    if (userMessage) {
        updateChatLog(userMessage, 'user');
        const botResponse = generateResponse(userMessage);
        setTimeout(() => { // Simulate response delay
            updateChatLog(botResponse, 'bot');
        }, 500);
    }
}

// 6. Receive Message
function addBotMessage(message) {
    updateChatLog(message, 'bot');
}

// 7. Fetch Data
function fetchData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

// 8. Parse Input
function parseInput(input) {
    // Basic parsing for now, can be extended for more complex parsing
    return input.toLowerCase().split(' ');
}

// 9. Manage Context
function manageContext(input) {
    // Example of managing context
    if (input.includes('weather')) {
        context.topic = 'weather';
    } else {
        context.topic = 'general';
    }
}

// 10. Error Handling
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Error:', msg, 'Script:', url, 'Line:', lineNo, 'Column:', columnNo, 'StackTrace:', error);
    return true;
};

// Modify sendMessage to use new functions
function sendMessage() {
    const userMessage = handleUserInput();
    if (userMessage) {
        const parsedInput = parseInput(userMessage);
        manageContext(parsedInput);

        updateChatLog(userMessage, 'user');
        
        const botResponse = generateResponse(userMessage);
        setTimeout(() => { // Simulate response delay
            updateChatLog(botResponse, 'bot');
        }, 500);

        if (context.topic === 'weather') {
            fetchData('https://api.example.com/weather', (data) => {
                addBotMessage(`The weather is ${data.weather}`);
            });
        }
    }
}

// Initialize the chatbot on page load
initChatbot();
