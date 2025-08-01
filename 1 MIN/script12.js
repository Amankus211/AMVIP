document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const predictedNumberElement = document.getElementById('predictedNumber');
    const predictedPremiumElement = document.getElementById('predictedPremium');
    const timerElement = document.getElementById('timeRemaining');
    const issueNumberElement = document.getElementById('issueNumber');
    const loadingElement = document.getElementById('loading');
    const refreshButton = document.getElementById('refreshButton');

    // Configuration
    const API_CONFIG = {
        typeId: 1,
        language: 0,
        random: "e7fe6c090da2495ab8290dac551ef1ed",
        signature: "1F390E2B2D8A55D693E57FD905AE73A7"
    };

    // State variables
    let currentIssueNumber = null;
    let timerInterval = null;
    let isFetching = false;

    // Sound effects
    const playSound = (type) => {
        if (typeof Audio === 'undefined') return;
        
        const sounds = {
            success: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
            refresh: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3',
            warning: 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
        };
        
        const sound = new Audio(sounds[type] || sounds.refresh);
        sound.volume = 0.3;
        sound.play().catch(e => console.log("Audio play failed:", e));
    };

    // API Fetch function with error handling
    const fetchGameIssue = async () => {
        if (isFetching) return null;
        isFetching = true;
        
        try {
            const requestData = {
                ...API_CONFIG,
                timestamp: Math.floor(Date.now() / 1000)
            };

            const response = await fetch('https://api.bdg88zf.com/api/webapi/GetGameIssue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        } finally {
            isFetching = false;
        }
    };

    // Enhanced prediction algorithm
    const generatePrediction = () => {
        // Get current minute to add some pattern
        const minute = new Date().getMinutes();
        
        // More strategic prediction based on time patterns
        let category;
        let premium;
        
        // Alternate between Big/Small more strategically
        if (minute % 3 === 0) {
            category = Math.random() < 0.7 ? 'Big' : 'Small';
        } else if (minute % 3 === 1) {
            category = Math.random() < 0.3 ? 'Big' : 'Small';
        } else {
            category = Math.random() < 0.5 ? 'Big' : 'Small';
        }
        
        // Premium with some pattern (higher premiums at specific minutes)
        if (minute % 5 === 0) {
            premium = (Math.random() * 5 + 5).toFixed(2); // 5.00 - 9.99
        } else {
            premium = (Math.random() * 4 + 1).toFixed(2); // 1.00 - 4.99
        }
        
        return { category, premium };
    };

    // Update prediction display
    const updatePredictionDisplay = (prediction) => {
        predictedNumberElement.textContent = `Bet on: ${prediction.category}`;
        predictedNumberElement.style.color = prediction.category === 'Big' ? '#ff6b81' : '#7bed9f';
        
        predictedPremiumElement.textContent = `Premium: ${prediction.premium}`;
        
        // Store prediction in session storage
        sessionStorage.setItem('lastPrediction', JSON.stringify({
            ...prediction,
            timestamp: Date.now(),
            issueNumber: currentIssueNumber
        }));
    };

    // Show loading state
    const showLoading = () => {
        loadingElement.style.display = 'block';
        predictedNumberElement.style.opacity = '0.5';
        predictedPremiumElement.style.opacity = '0.5';
    };

    // Hide loading state
    const hideLoading = () => {
        loadingElement.style.display = 'none';
        predictedNumberElement.style.opacity = '1';
        predictedPremiumElement.style.opacity = '1';
    };

    // Update prediction for a new issue
    const updatePrediction = (issueNumber) => {
        if (currentIssueNumber === issueNumber) return;
        
        currentIssueNumber = issueNumber;
        issueNumberElement.textContent = `Period: ${currentIssueNumber}`;
        
        showLoading();
        playSound('refresh');
        
        // Simulate API delay
        setTimeout(() => {
            const prediction = generatePrediction();
            updatePredictionDisplay(prediction);
            hideLoading();
        }, 1500);
    };

    // Update timer display
    const updateTimerDisplay = (msLeft) => {
        if (msLeft <= 0) {
            timerElement.textContent = "00:00";
            timerElement.style.color = 'var(--danger-color)';
            return false;
        }
        
        const mins = String(Math.floor(msLeft / 60000)).padStart(2, '0');
        const secs = String(Math.floor((msLeft % 60000) / 1000)).padStart(2, '0');
        timerElement.textContent = `${mins}:${secs}`;
        
        // Change color when time is running out
        if (msLeft <= 10000) { // 10 seconds
            timerElement.style.color = 'var(--danger-color)';
            if (msLeft <= 5000 && msLeft % 1000 < 100) {
                playSound('warning');
            }
        } else if (msLeft <= 30000) { // 30 seconds
            timerElement.style.color = 'var(--warning-color)';
        } else {
            timerElement.style.color = 'var(--success-color)';
        }
        
        return true;
    };

    // Main timer function
    const updateTimer = async () => {
        const data = await fetchGameIssue();
        if (!data?.data) return;

        const { endTime, issueNumber } = data.data;
        const now = new Date();
        const end = new Date(endTime);
        const msLeft = end - now;

        // Update timer display
        const timeValid = updateTimerDisplay(msLeft);

        // Handle new issue
        if (currentIssueNumber !== issueNumber) {
            updatePrediction(issueNumber);
        }

        // Handle timer expiration
        if (!timeValid) {
            clearInterval(timerInterval);
            setTimeout(() => {
                fetchGameIssue().then(newData => {
                    if (newData?.data) {
                        updatePrediction(newData.data.issueNumber);
                        timerInterval = setInterval(updateTimer, 1000);
                    }
                });
            }, 3000);
        }
    };

    // Initialize the application
    const initialize = async () => {
        // Load last prediction from session storage
        const stored = sessionStorage.getItem('lastPrediction');
        if (stored) {
            try {
                const prediction = JSON.parse(stored);
                if (Date.now() - prediction.timestamp < 3600000) { // 1 hour
                    updatePredictionDisplay(prediction);
                    currentIssueNumber = prediction.issueNumber;
                }
            } catch (e) {
                console.log("Failed to parse stored prediction", e);
            }
        }

        // Initial data fetch
        const data = await fetchGameIssue();
        if (data?.data) {
            updatePrediction(data.data.issueNumber);
        }

        // Start timer
        timerInterval = setInterval(updateTimer, 1000);
    };

    // Refresh button handler
    refreshButton.addEventListener('click', () => {
        if (isFetching) return;
        playSound('refresh');
        fetchGameIssue().then(data => {
            if (data?.data) {
                updatePrediction(data.data.issueNumber);
            }
        });
    });

    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            fetchGameIssue().then(data => {
                if (data?.data && data.data.issueNumber !== currentIssueNumber) {
                    updatePrediction(data.data.issueNumber);
                }
            });
        }
    });

    // Initialize the app
    initialize();
});

