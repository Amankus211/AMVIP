document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
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

    // Generate color prediction (only Red or Green)
    const generatePrediction = () => {
        // Get current time components for pattern
        const now = new Date();
        const seconds = now.getSeconds();
        
        // Generate color with pattern based on seconds
        let color;
        const rand = Math.random();
        
        // Pattern: First 30 seconds slightly favor Green, last 30 slightly favor Red
        if (seconds < 30) {
            color = rand < 0.6 ? 'Green' : 'Red';
        } else {
            color = rand < 0.6 ? 'Red' : 'Green';
        }
        
        return { color };
    };

    // Update prediction display
    const updatePredictionDisplay = (prediction) => {
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
        predictedColorElement.style.opacity = '0.5';
    };

    // Hide loading state
    const hideLoading = () => {
        loadingElement.style.display = 'none';
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

