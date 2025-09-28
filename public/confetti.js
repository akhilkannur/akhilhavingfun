document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const opensInNewTab = link.target === '_blank';
            const isMailto = link.href.startsWith('mailto:');


            if (opensInNewTab || isMailto) {
                return;
            }

            e.preventDefault();

            for (let i = 0; i < 50; i++) {
                createConfetti(e.clientX, e.clientY);
            }

            setTimeout(() => {
                window.location = link.href;
            }, 500);
        });
    });

    function createConfetti(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        document.body.appendChild(confetti);

        const colors = ['#A3FF12', '#FF4ECD', '#7C4DFF', '#FF7F11', '#29ABE2', '#00BFA6'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';

        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 3 + 2;
        const gravity = 0.1;

        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;

        function animate() {
            vx *= 0.99;
            vy += gravity;

            confetti.style.left = (parseFloat(confetti.style.left) + vx) + 'px';
            confetti.style.top = (parseFloat(confetti.style.top) + vy) + 'px';

            if (parseFloat(confetti.style.top) > window.innerHeight) {
                confetti.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }
});