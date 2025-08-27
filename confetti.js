document.addEventListener('click', function(event) {
    // Check if the clicked element or any of its parents is an anchor tag
    let targetElement = event.target;
    while (targetElement && targetElement.tagName !== 'A') {
        targetElement = targetElement.parentNode;
    }

    if (targetElement && targetElement.tagName === 'A') {
        // Confetti logic
        const confettiCount = 100;
        const colors = ['#00BFA6', '#A3FF12', '#FF4ECD', '#7C4DFF', '#FF7F11', '#29ABE2']; // Neon palette

        // Trigger confetti from the click point
        const clickX = event.clientX;
        const clickY = event.clientY;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${clickX + (Math.random() - 0.5) * 200}px`; // Random horizontal spread
            confetti.style.top = `${clickY + (Math.random() - 0.5) * 200}px`; // Random vertical spread
            document.body.appendChild(confetti);

            // Animate confetti
            const animationDuration = Math.random() * 1 + 3; // Longer duration
            const translateX = (Math.random() - 0.5) * 500; // Wider fall
            const translateY = (Math.random() - 0.5) * 500 + 200; // Fall downwards more
            const rotate = Math.random() * 720; // More rotation

            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`, opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => {
                confetti.remove();
            };
        }
    }
});