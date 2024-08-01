const responses = {
    "hello": "Hi there! How can I assist you today?",
    "What Global Electro Sell ?": "we provide a wide range of electrical and electronics goods.",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "need help": "How I can help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    "no": "Okay, if you change your mind just let me know!"
};

let isFirstOpen = true;

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add event listener to document to detect clicks outside the chat box
document.addEventListener('click', function(event) {
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const isClickInsideChatBox = chatbotPopup.contains(event.target);
    const isClickInsideToggleBtn = chatbotToggleBtn.contains(event.target);

    if (!isClickInsideChatBox && !isClickInsideToggleBtn && chatbotPopup.style.display === 'block') {
        toggleChatbot();
    }
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    const isOpening = chatbotPopup.style.display === 'none';
    chatbotPopup.style.display = isOpening ? 'block' : 'none';
    if (isOpening && isFirstOpen) {
        appendMessage('bot', "How can I help you, sir?");
        isFirstOpen = false;
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}