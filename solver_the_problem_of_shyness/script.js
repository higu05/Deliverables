const tips = [
    "Smile at someone today!",
    "Ask someone how their day is going.",
    "Compliment someone genuinely.",
    "Make eye contact with a stranger.",
    "Start a conversation with a cashier."
];

const challenges = [
    "Introduce yourself to a stranger.",
    "Ask for directions, even if you know the way.",
    "Join a group conversation.",
    "Share something personal about yourself.",
    "Give a public speech or presentation."
];

function generateTip() {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('tip').innerText = randomTip;
}

function completeChallenge() {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('challenge').innerText = randomChallenge;
}
