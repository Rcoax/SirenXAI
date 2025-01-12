export const bgMusic = new Audio('assets/audio/background-music.mp3');
bgMusic.loop = true;

export const hoverSound = new Audio('assets/audio/hover.mp3');
export const selectSound = new Audio('assets/audio/select.mp3');
export const tvSound = new Audio('assets/audio/tv-sound.mp3');

export let isSoundEnabled = true;

export function initAudio() {
    const soundToggle = document.querySelector('#sound-toggle');
    const soundIcon = soundToggle.querySelector('i');
    
    soundToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        isSoundEnabled = !isSoundEnabled;
        
        // Update icon
        soundIcon.className = isSoundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        
        // Control audio
        if (!isSoundEnabled) {
            bgMusic.pause();
        } else if (document.getElementById('menu-screen').classList.contains('active')) {
            bgMusic.play();
        }
    });
}