import { chatInput, sendButton, chatMessages } from './domElements.js';

export function initChat() {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && chatInput.value.trim()) {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', () => {
        if (chatInput.value.trim()) {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    // Add user message to chat
    addUserMessage(message);
    
    // Send message to Botpress
    if (window.botpress) {
        window.botpress.sendMessage(message);
    }
    
    // Clear input
    chatInput.value = '';
}

export function addBotMessage(text) {
    // Avoid adding empty messages
    if (!text.trim()) return;
    
    console.log('Creating bot message element');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="bot-avatar"></div>
        <div class="message-content">${text}</div>
    `;
    
    if (chatMessages) {
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        console.log('Message added to chat');
    } else {
        console.error('Chat messages container not found');
    }
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}