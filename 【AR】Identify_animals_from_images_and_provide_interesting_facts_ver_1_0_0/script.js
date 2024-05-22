const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const animalInfo = document.getElementById('animalInfo');
let model;

// Load the MobileNet model
async function loadModel() {
    model = await mobilenet.load();
    console.log('Model Loaded');
}

// Start the webcam
async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { video: true },
                stream => {
                    video.srcObject = stream;
                    video.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject(error)
            );
        } else {
            reject();
        }
    });
}

captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    identifyAnimal();
});

async function identifyAnimal() {
    const predictions = await model.classify(canvas);
    const topPrediction = predictions[0];
    displayAnimalInfo(topPrediction);
}

function displayAnimalInfo(prediction) {
    animalInfo.innerHTML = `
        <p><strong>Animal:</strong> ${prediction.className}</p>
        <p><strong>Confidence:</strong> ${(prediction.probability * 100).toFixed(2)}%</p>
        <p>${getAnimalFacts(prediction.className)}</p>
    `;
}

function getAnimalFacts(animal) {
    const facts = {
        'cat': 'Cats are small, carnivorous mammals that are often kept as pets.',
        'dog': 'Dogs are domesticated mammals, not natural wild animals.',
        'elephant': 'Elephants are the largest land animals on Earth.',
        // Add more facts as needed
    };
    return facts[animal.toLowerCase()] || 'No facts available for this animal.';
}

// Initialize everything
async function init() {
    await loadModel();
    await setupWebcam();
}

init();
