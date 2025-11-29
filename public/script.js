document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('onboarding-modal');
    const startBtn = document.getElementById('start-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const recommendationsArea = document.getElementById('recommendations-area');

    // Handle Modal
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            loadRecommendations();
        });
    }

    // Contact Modal Logic
    const contactModal = document.getElementById('contact-modal');
    const closeContactBtn = document.getElementById('close-contact-btn');
    const contactLink = document.querySelector('.sidebar-nav li:nth-child(2)'); // Desktop sidebar
    const mobileContactBtn = document.getElementById('mobile-contact-btn'); // Mobile header button

    // Desktop contact link
    if (contactLink) {
        contactLink.addEventListener('click', () => {
            contactModal.style.display = 'flex';
        });
    }

    // Mobile contact button
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', () => {
            contactModal.style.display = 'flex';
        });
    }

    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });

    // Send Message Function
    async function sendMessage(message) {
        if (!message.trim()) return;

        // Add User Message
        appendMessage(message, 'user');
        userInput.value = '';

        // Show Loading Indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot-message', 'loading-message');
        loadingDiv.innerHTML = '<div class="message-content">...</div>';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Remove loading
            if (chatMessages.contains(loadingDiv)) {
                chatMessages.removeChild(loadingDiv);
            }

            if (data.error) {
                appendMessage('Error: ' + data.error, 'bot');
            } else {
                typeMessage(data.response);
            }
        } catch (error) {
            console.error('Error:', error);
            if (chatMessages.contains(loadingDiv)) chatMessages.removeChild(loadingDiv);
            appendMessage('Sorry, something went wrong. Please try again.', 'bot');
        }
    }

    // Append Message to Chat (Instant)
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');

        // Simple markdown parsing
        contentDiv.innerHTML = parseMarkdown(text);

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Typewriter Effect for Bot
    function typeMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        const html = parseMarkdown(text);
        let i = 0;

        function type() {
            if (i < html.length) {
                let char = html.charAt(i);
                if (char === '<') {
                    // Skip tags (append instantly)
                    let tagEnd = html.indexOf('>', i);
                    if (tagEnd !== -1) {
                        contentDiv.innerHTML += html.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        contentDiv.innerHTML += char;
                        i++;
                    }
                } else {
                    contentDiv.innerHTML += char;
                    i++;
                }
                chatMessages.scrollTop = chatMessages.scrollHeight;
                setTimeout(type, 15); // Typing speed
            }
        }
        type();
    }

    function parseMarkdown(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }

    // Load Recommendations
    async function loadRecommendations() {
        try {
            const response = await fetch('/api/recommendations');
            const data = await response.json();

            recommendationsArea.innerHTML = '';
            data.questions.forEach(question => {
                const chip = document.createElement('div');
                chip.classList.add('chip');
                chip.textContent = question;
                chip.addEventListener('click', () => sendMessage(question));
                recommendationsArea.appendChild(chip);
            });
        } catch (error) {
            console.error('Failed to load recommendations:', error);
        }
    }

    // Event Listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', () => sendMessage(userInput.value));
    }

    if (userInput) {
        // Auto-resize textarea
        userInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if (this.value === '') {
                this.style.height = 'auto';
            }
        });

        // Handle Enter key
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent newline
                sendMessage(userInput.value);
                // Reset height
                userInput.style.height = 'auto';
            }
        });
    }
});
