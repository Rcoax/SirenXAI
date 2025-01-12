import { initAudio } from './modules/audio.js';
import { initBotpress } from './modules/botpress.js';
import { initChat } from './modules/chat.js';
import { initEffects } from './modules/effects.js';
import { initMenus } from './modules/menu.js';
import { initNavigation } from './modules/navigation.js';
import { initScreens } from './modules/screens.js';
import { initSwipeGestures } from './modules/swipeHandler.js';
import { initGallery } from './modules/gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initBotpress();
    initChat();
    initEffects();
    initMenus();
    initNavigation();
    initScreens();
    initSwipeGestures();
    initGallery();
});