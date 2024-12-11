// Store Map and Footstep Logic
const footstepHeatmap = document.querySelector('.footstep-heatmap');

function generateFootsteps(numFootsteps = 50) {
    for (let i = 0; i < numFootsteps; i++) {
        const x = Math.random() * 100; // Random x position (percentage)
        const y = Math.random() * 100; // Random y position (percentage)

        const size = Math.random() * 30 + 10; // Random size between 10px and 40px
        const opacity = Math.random() * 0.6 + 0.2; // Random opacity between 0.2 and 0.8

        const footstep = document.createElement('div');
        footstep.classList.add('footstep');
        footstep.style.left = `${x}%`;
        footstep.style.top = `${y}%`;
        footstep.style.width = `${size}px`;
        footstep.style.height = `${size}px`;
        footstep.style.backgroundColor = `rgba(255, 0, 0, ${opacity})`;

        // Dynamically add and remove the class that triggers the animation
        footstep.classList.add('animateFootstep');
        setTimeout(() => footstep.classList.remove('animateFootstep'), 500); // Remove animation class after animation duration

        footstepHeatmap.appendChild(footstep);
    }
}

// Initialize with 50 footsteps
generateFootsteps(50);
