const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    messageInput.value = '';
    messageInput.focus();

    appendMessage('bot', 'Typing...');

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        updateLastBotMessage(data.reply);

    } catch (error) {
        console.error('Error fetching chat response:', error);
        updateLastBotMessage('Sorry, something went wrong. Please try again.');
    }
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    const roleClass = sender === 'user' ? 'user' : 'bot';
    msgDiv.classList.add('message', roleClass);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(text) {
    const messages = chatBox.getElementsByClassName('bot');
    if (messages.length > 0) {
        messages[messages.length - 1].textContent = text;
    }
}