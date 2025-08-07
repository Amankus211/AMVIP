        // Theme Toggle
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // Set initial theme
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
        }

        // Generate and store a random Device ID (0-20)
        window.onload = function() {
            let randomNumber = localStorage.getItem('randomNumber');
            if (!randomNumber) {
                randomNumber = Math.floor(Math.random() * 21); // 0-20
                localStorage.setItem('randomNumber', randomNumber);
            }
        };

        // Device ID Modal
        const deviceIdBtn = document.getElementById('deviceIdBtn');
        const deviceIdModal = document.getElementById('deviceIdModal');
        const deviceIdDisplay = document.getElementById('deviceIdDisplay');
        const copyDeviceIdBtn = document.getElementById('copyDeviceId');
        const closeModal = document.querySelector('.close-modal');

        deviceIdBtn.addEventListener('click', () => {
            const randomNumber = localStorage.getItem('randomNumber');
            deviceIdDisplay.textContent = randomNumber;
            deviceIdModal.style.display = 'flex';
        });

        copyDeviceIdBtn.addEventListener('click', () => {
            const randomNumber = localStorage.getItem('randomNumber');
            navigator.clipboard.writeText(randomNumber)
                .then(() => {
                    copyDeviceIdBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyDeviceIdBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    copyDeviceIdBtn.textContent = 'Error';
                    setTimeout(() => {
                        copyDeviceIdBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                });
        });

        closeModal.addEventListener('click', () => {
            deviceIdModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === deviceIdModal) {
                deviceIdModal.style.display = 'none';
            }
        });

        // Chat Widget Toggle
        const chatToggle = document.getElementById('chatToggle');
        const chatWidget = document.getElementById('chatWidget');
        const closeChat = document.getElementById('closeChat');

        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });

        // Simple Chat Functionality
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        const sendMsg = document.getElementById('sendMsg');

        function addMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
            messageDiv.style.marginBottom = '10px';
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        sendMsg.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                addMessage('You', message);
                chatInput.value = '';
                
                // Simulate reply after 1 second
                setTimeout(() => {
                    addMessage('Support', 'Thanks for your message. Our team will get back to you soon.');
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMsg.click();
            }
        });

        // Verify the entered key
        function verifyKey() {
            const randomNumber = localStorage.getItem('randomNumber');
            const userKey = document.getElementById('user-key').value.trim();
            const correctKey = getKeyForNumber(randomNumber);
            const loadingElement = document.getElementById('loading');
            const messageElement = document.getElementById('message');

            // Validate input
            if (!userKey) {
                messageElement.textContent = '❌ Please enter an user id key';
                messageElement.className = 'error';
                return;
            }

            // Show loading animation
            loadingElement.style.display = 'block';
            messageElement.textContent = '';
            messageElement.className = '';

            setTimeout(() => {
                loadingElement.style.display = 'none';

                if (userKey === correctKey) {
                    messageElement.textContent = '✅ Key Verified..';
                    messageElement.className = 'success';
                    setTimeout(() => {
                        window.location.href = 'navig2.html';
                    }, 1000);
                } else {
                    messageElement.textContent = '❌ Key. Please try again.';
                    messageElement.className = 'error';
                }
            }, 1500); // Simulate delay
        }

        // Hardcoded key mapping (0-20)
        function getKeyForNumber(number) {
            const keys = {
                0: "AMVIP", 1: "T93r2", 2: "A3f9k0", 3: "U7y7a0", 4: "Shbnf", 
                5: "5n6M8", 6: "Ls0", 7: "Hx2C34", 8: "P7R9e8", 9: "NZ4l3", 
                10: "L9kh6", 11: "6W5hg2", 12: "", 13: "", 14: "4i1O0p9", 
                15: "36hk2", 16: "Shubh2", 17: "I65fq6", 18: "K1l2J8", 19: "O4R3e2", 
                20: "Shvjy"
            };
            return keys[number];
        }
