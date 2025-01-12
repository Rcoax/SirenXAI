import { gameContainer } from './domElements.js';

export function initEffects() {
    // Create initial shooting stars
    for (let i = 0; i < 3; i++) {
        setTimeout(createShootingStar, i * 2000);
    }

    // Create shooting stars periodically
    setInterval(createShootingStar, 4000);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    gameContainer.appendChild(star);

    star.addEventListener('animationend', () => {
        star.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            accordion.classList.toggle('active');
        });
    });
});