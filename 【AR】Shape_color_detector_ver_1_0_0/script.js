// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const shapeEntity = document.getElementById('shape');
    const shapeNameSpan = document.getElementById('shape-name');
    const colorNameSpan = document.getElementById('color-name');

    // Dummy machine learning model simulation
    function recognizeShapeAndColor() {
        // Simulating shape and color recognition
        const shapes = ['Box', 'Sphere', 'Cylinder', 'Cone'];
        const colors = ['Yellow', 'Red', 'Green', 'Blue'];
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return { shape, color };
    }

    // Update AR shape and color based on recognition
    function updateAR() {
        const recognitionResult = recognizeShapeAndColor();

        shapeEntity.setAttribute('geometry', 'primitive', recognitionResult.shape.toLowerCase());
        shapeEntity.setAttribute('material', 'color', recognitionResult.color.toLowerCase());

        shapeNameSpan.textContent = recognitionResult.shape;
        colorNameSpan.textContent = recognitionResult.color;
    }

    // Update AR content every 5 seconds
    setInterval(updateAR, 5000);
});
