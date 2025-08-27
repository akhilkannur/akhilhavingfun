document.addEventListener('click', function(event) {
    console.log('Click event detected.'); // Debug log

    let targetElement = event.target;
    while (targetElement && targetElement.tagName !== 'A') {
        targetElement = targetElement.parentNode;
    }

    if (targetElement && targetElement.tagName === 'A') {
        console.log('Anchor tag clicked:', targetElement.href); // Debug log
        event.preventDefault();

        const confettiCount = 100;
        const colors = ['#00BFA6', '#A3FF12', '#FF4ECD', '#7C4DFF', '#FF7F11', '#29ABE2'];

        const clickX = event.clientX;
        const clickY = event.clientY;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${clickX + (Math.random() - 0.5) * 200}px`;
            confetti.style.top = `${clickY + (Math.random() - 0.5) * 200}px`;
            document.body.appendChild(confetti);

            // Make confetti very large and fully opaque for debugging
            confetti.style.width = '50px';
            confetti.style.height = '50px';
            confetti.style.opacity = '1';

            const animationDuration = Math.random() * 1 + 5; // Even longer duration
            const translateX = (Math.random() - 0.5) * 500;
            const translateY = (Math.random() - 0.5) * 500 + 200;
            const rotate = Math.random() * 720;

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

        setTimeout(() => {
            window.location.href = targetElement.href;
        }, 500); // Longer delay for debugging
    }