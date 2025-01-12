export function initGallery() {
    const arbChanImages = [
        'assets/resources/galleryARB/1.jpg',
        'assets/resources/galleryARB/2.jpg',
        'assets/resources/galleryARB/3.jpg',
        'assets/resources/galleryARB/4.jpg'
    ];

    const kawaiiImages = [
        'assets/resources/galleryKAWAII/1.jpg',
        'assets/resources/galleryKAWAII/2.jpg',
        'assets/resources/galleryKAWAII/3.jpg',
        'assets/resources/galleryKAWAII/4.jpg'
    ];

    // Initialize galleries with correct selectors
    const triggers = document.querySelectorAll('.gallery-trigger');
    triggers.forEach(trigger => {
        const galleryType = trigger.dataset.gallery;
        const modal = document.querySelector(`.${galleryType}-gallery`);
        const images = galleryType === 'arb' ? arbChanImages : kawaiiImages;
        
        initSingleGallery(trigger, modal, images);
    });
}

function initSingleGallery(trigger, modal, images) {
    let currentImageIndex = 0;
    
    const closeBtn = modal.querySelector('.close-gallery');
    const prevBtn = modal.querySelector('.gallery-nav.prev');
    const nextBtn = modal.querySelector('.gallery-nav.next');
    const galleryImage = modal.querySelector('.gallery-image');
    const imageCounter = modal.querySelector('.image-counter');
    const galleryContent = modal.querySelector('.gallery-content');

    // Add click zones
    const leftZone = document.createElement('div');
    const rightZone = document.createElement('div');
    
    leftZone.className = 'click-zone left';
    rightZone.className = 'click-zone right';
    
    galleryContent.appendChild(leftZone);
    galleryContent.appendChild(rightZone);

    // Click zones handlers
    leftZone.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    rightZone.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    // Add click handler
    trigger.addEventListener('click', () => {
        modal.style.display = 'block';
        currentImageIndex = 0;
        updateImage();
    });

    // Close button handler
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function updateImage() {
        galleryImage.src = images[currentImageIndex];
        imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateImage();
            }
            if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateImage();
            }
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
}