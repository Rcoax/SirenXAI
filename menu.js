import { menuItems, menuScreen } from './domElements.js';
import { hoverSound, selectSound, isSoundEnabled } from './audio.js';
import { screenMap } from './screens.js';

export function initMenus() {
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (isSoundEnabled) {
                hoverSound.currentTime = 0;
                hoverSound.play();
            }
        });

        item.addEventListener('click', () => {
            if (isSoundEnabled) {
                selectSound.currentTime = 0;
                selectSound.play();
            }
            
            const screenName = item.textContent.trim(); // Add trim() to clean whitespace
            if (screenMap[screenName]) {
                menuScreen.classList.remove('active');
                screenMap[screenName].classList.add('active');
                console.log(`Showing screen: ${screenName}`); // Debug line
            } else {
                console.warn(`Screen not found for: ${screenName}`); // Debug line
            }
        });
    });
}

function setBrowserChromeHeight() {
    const windowHeight = window.innerHeight;
    const visualHeight = window.visualViewport.height;
    const chromeHeight = windowHeight - visualHeight;
    document.documentElement.style.setProperty('--browser-chrome-height', `${chromeHeight}px`);
}

window.visualViewport.addEventListener('resize', setBrowserChromeHeight);
setBrowserChromeHeight();