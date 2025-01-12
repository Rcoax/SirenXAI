import { aboutScreen, featuresScreen, arbiChanScreen, tokenomicsScreen, docsScreen, redactedScreen, menuScreen, gameContainer, whiteNoise, startScreen } from './domElements.js';
import { tvSound, bgMusic, selectSound, isSoundEnabled } from './audio.js';

export const screenMap = {
    'ABOUT ME': aboutScreen,
    'FEATURES': featuresScreen,
    'ARBI-CHAN': arbiChanScreen,
    '$KAWAII': tokenomicsScreen,
    'DOCS': docsScreen,
    'REDACTED 🔜': redactedScreen
};

export function initScreens() {
    // Start screen handlers
    document.addEventListener('keydown', (e) => {
        if (startScreen.classList.contains('active') && (e.code === 'Enter' || e.code === 'Space')) {
            startGame();
        }
    });

    startScreen.addEventListener('click', startGame);

    // Back button handlers
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            if (isSoundEnabled) {
                selectSound.play();
            }
            document.querySelector('.screen.active').classList.remove('active');
            menuScreen.classList.add('active');
        });
    });
}

function startGame() {
    if (startScreen.classList.contains('active')) {
        if (isSoundEnabled) {
            tvSound.play();
        }
        
        // TV turn off effect
        gameContainer.classList.add('tv-off');
        whiteNoise.classList.add('active');
        
        setTimeout(() => {
            startScreen.classList.remove('active');
            menuScreen.classList.add('active');
            
            // TV turn on effect
            gameContainer.classList.remove('tv-off');
            gameContainer.classList.add('tv-on');
            
            setTimeout(() => {
                whiteNoise.classList.remove('active');
                gameContainer.classList.remove('tv-on');
                
                if (isSoundEnabled) {
                    bgMusic.play();
                }
            }, 800);
        }, 800);
    }
}