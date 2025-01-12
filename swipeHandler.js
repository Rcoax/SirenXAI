export function initSwipeGestures() {
    const swipeText = document.querySelector('.swipe-text');
    const menuScreen = document.getElementById('menu-screen');
    const chatScreen = document.getElementById('chat-screen');
    const menuItems = document.querySelectorAll('.menu-item');
    const bottomBarItems = document.querySelectorAll('.bottom-bar *');
    
    let startY = 0;
    let endY = 0;
    let isMenuClick = false;

    // Prevent menu and bottom bar items from triggering swipe
    [...menuItems, ...bottomBarItems].forEach(item => {
        item.addEventListener('touchstart', (e) => {
            isMenuClick = true;
            e.stopPropagation();
        }, { passive: false });

        item.addEventListener('touchend', (e) => {
            e.stopPropagation();
        }, { passive: false });
    });
    
    // Touch events for mobile
    swipeText.addEventListener('touchstart', (e) => {
        if (!isMenuClick && !e.target.closest('.bottom-bar')) {
            startY = e.touches[0].clientY;
        }
    }, { passive: false });
    
    swipeText.addEventListener('touchmove', (e) => {
        if (!isMenuClick) {
            endY = e.touches[0].clientY;
        }
    }, { passive: false });
    
    swipeText.addEventListener('touchend', () => {
        if (!isMenuClick) {
            handleSwipe();
        }
        isMenuClick = false;
    }, { passive: false });
    
    // Mouse events for desktop
    swipeText.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
    
    function handleMouseMove(e) {
        endY = e.clientY;
    }
    
    function handleMouseUp() {
        handleSwipe();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
    
    // Click fallback
    swipeText.addEventListener('click', () => {
        if (menuScreen.classList.contains('active')) {
            menuScreen.classList.remove('active');
            chatScreen.classList.add('active');
        }
    });
    
    function handleSwipe() {
        const swipeDistance = startY - endY;
        // If swipe up is more than 50px
        if (swipeDistance > 50 && menuScreen.classList.contains('active')) {
            menuScreen.classList.remove('active');
            chatScreen.classList.add('active');
        }
    }
    
    // Add visual feedback
    swipeText.style.cursor = 'pointer';
    swipeText.style.userSelect = 'none'; // Prevent text selection during drag
}
