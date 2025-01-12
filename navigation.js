import { menuScreen, chatScreen, gameContainer, whiteNoise, swipeText, minimizeButton } from './domElements.js';
import { tvSound, selectSound, isSoundEnabled } from './audio.js';

export function initNavigation() {
    // Minimize button handler
    minimizeButton?.addEventListener('click', () => {
        if (isSoundEnabled) {
            selectSound.play();
        }
        chatScreen.classList.remove('active');
        menuScreen.classList.add('active');
    });

    // Swipe text handler
    if (swipeText) {
        swipeText.style.cursor = 'pointer';
        
        swipeText.addEventListener('click', () => {
            console.log('Swipe text clicked'); // Debug line
            if (menuScreen.classList.contains('active')) {
                console.log('Menu screen is active, transitioning to chat'); // Debug line
                if (isSoundEnabled) {
                    tvSound.play();
                }
                
                // TV turn off effect
                gameContainer.classList.add('tv-off');
                whiteNoise.classList.add('active');
                
                setTimeout(() => {
                    menuScreen.classList.remove('active');
                    chatScreen.classList.add('active');
                    
                    // TV turn on effect
                    gameContainer.classList.remove('tv-off');
                    gameContainer.classList.add('tv-on');
                    
                    setTimeout(() => {
                        whiteNoise.classList.remove('active');
                        gameContainer.classList.remove('tv-on');
                    }, 800);
                }, 800);
            }
        });
    }

    // Touch gesture handlers
    initTouchGestures();
}

function initTouchGestures() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', e => {
        touchEndY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', () => {
        if (menuScreen.classList.contains('active') && touchStartY - touchEndY > 50) {
            showChatScreen();
        }
    });
}

export function showChatScreen() {
    if (isSoundEnabled) {
        selectSound.play();
    }
    menuScreen.classList.remove('active');
    chatScreen.classList.add('active');
}