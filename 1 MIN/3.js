document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const predictedNumberElement = document.getElementById('predictedNumber');
    const predictedColorElement = document.getElementById('predictedColor');
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

    // Generate number (0-9) and color (Red, Green, Violet) prediction
    const generatePrediction = () => {
        // Get current time components for pattern
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Generate number with some pattern based on time
        let number;
        if (minutes % 5 === 0) {
            // Higher chance for numbers 5-9 at 5-minute intervals
            number = Math.floor(Math.random() * 5) + 5;
        } else {
            number = Math.floor(Math.random() * 10);
        }
        
        // Generate color with some pattern
        let color;
        const colorRand = Math.random();
        
        if (seconds < 20) {
            // First 20 seconds of minute favor Violet
            color = colorRand < 0.6 ? 'Violet' : (colorRand < 0.8 ? 'Red' : 'Green');
        } else if (seconds < 40) {
            // Middle 20 seconds favor Red
            color = colorRand < 0.6 ? 'Red' : (colorRand < 0.8 ? 'Green' : 'Violet');
        } else {
            // Last 20 seconds favor Green
            color = colorRand < 0.6 ? 'Green' : (colorRand < 0.8 ? 'Red' : 'Violet');
        }
        
        return { number, color };
    };

    // Update prediction display
    const updatePredictionDisplay = (prediction) => {
        predictedNumberElement.textContent = prediction.number;
        
        predictedColorElement.textContent = prediction.color;
        predictedColorElement.className = 'prediction-color'; // Reset classes
        predictedColorElement.classList.add(`color-${prediction.color.toLowerCase()}`);
        
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
        predictedColorElement.style.opacity = '0.5';
    };

    // Hide loading state
    const hideLoading = () => {
        loadingElement.style.display = 'none';
        predictedNumberElement.style.opacity = '1';
        predictedColorElement.style.opacity = '1';
    };

    // Update prediction for a new issue
    const updatePrediction = (issueNumber) => {
        if (currentIssueNumber === issueNumber) return;
        
        currentIssueNumber = issueNumber;
        issueNumberElement.textContent = `Period: ${currentIssueNumber}`;
        
        showLoading();
        
        // Simulate prediction generation delay
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
            timerElement.style.color = 'var(--red-color)';
            return false;
        }
        
        const mins = String(Math.floor(msLeft / 60000)).padStart(2, '0');
        const secs = String(Math.floor((msLeft % 60000) / 1000)).padStart(2, '0');
        timerElement.textContent = `${mins}:${secs}`;
        
        // Change color when time is running out
        if (msLeft <= 10000) { // 10 seconds
            timerElement.style.color = 'var(--red-color)';
        } else if (msLeft <= 30000) { // 30 seconds
            timerElement.style.color = 'var(--violet-color)';
        } else {
            timerElement.style.color = '#ffffff';
        }
        
        return true;
    };

    // API Fetch function
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

