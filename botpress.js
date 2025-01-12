import { addBotMessage } from './chat.js';
import { chatInput, sendButton } from './domElements.js';
import { BOTPRESS_CONFIG } from './chat-config.js';

export function initBotpress() {
    // First check if Botpress script is already loaded
    if (!window.botpressWebChat) {
        // Create and load Botpress script
        const script = document.createElement('script');
        script.src = BOTPRESS_CONFIG.hostUrl;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
            // Initialize once script is loaded
            initBotpressChat();
        };

        script.onerror = (err) => {
            console.error('Failed to load Botpress script:', err);
            chatInput.placeholder = "Chat unavailable. Please try again later.";
        };

        document.body.appendChild(script);
    } else {
        // If already loaded, initialize directly
        initBotpressChat();
    }
}

function initBotpressChat() {
    // Wait for botpressWebChat to be available
    const initInterval = setInterval(() => {
        if (window.botpressWebChat) {
            clearInterval(initInterval);
            
            try {
                window.botpressWebChat.init({
                    clientId: BOTPRESS_CONFIG.clientId,
                    hostUrl: BOTPRESS_CONFIG.messagingUrl,
                    messagingUrl: BOTPRESS_CONFIG.messagingUrl,
                    botId: BOTPRESS_CONFIG.botId,
                    containerEl: '#bp-web-widget',
                    stylesheet: 'assets/css/styles.css',
                    hideWidget: true,
                    disableAnimations: false,
                    enableReset: true,
                    closeOnEscape: true
                });

                // Enable chat interface
                chatInput.disabled = false;
                sendButton.disabled = false;
                
                setupBotpressListeners();
            } catch (error) {
                console.error('Error initializing Botpress:', error);
                chatInput.placeholder = "Chat initialization failed. Please refresh.";
            }
        }
    }, 100);

    // Add timeout to prevent infinite checking
    setTimeout(() => clearInterval(initInterval), 10000);
}

function setupBotpressListeners() {
    window.botpress.on('webchat:ready', () => {
        const chatContainer = document.querySelector('#bp-web-widget, .bp-widget');
        if (chatContainer) {
            observeBotMessages(chatContainer);
        }
    });

    window.botpress.on('message', handleBotMessage);
}

function observeBotMessages(container) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList) {
                    const textContent = node.querySelector('.bp-message-text, .bpMessageBlocksTextText');
                    if (textContent) {
                        addBotMessage(textContent.textContent);
                    }
                }
            });
        });
    });

    observer.observe(container, {
        childList: true,
        subtree: true
    });
}

function handleBotMessage(message) {
    let text = '';
    if (message.payload?.block?.text) {
        text = message.payload.block.text;
    } else if (message.payload?.text) {
        text = message.payload.text;
    } else if (message.text) {
        text = message.text;
    }
    
    if (text) {
        addBotMessage(text);
    }
}