let previousPeriod = null;
let previousResult = null;

document.getElementById('getResultBtn').addEventListener('click', function() {
    const periodNumber = document.getElementById('periodNumber').value;
    
    // Check if the period number is valid
    if (periodNumber.length !== 3) {
        alert("Please enter a 3-digit period number first.");
        return;
    }

    // If the period number has not changed, show the same result
    if (periodNumber === previousPeriod) {
        showResult(previousResult, false);
        return;
    }

    // Store the current period number as previous
    previousPeriod = periodNumber;

    // Show the result popup and process a new result
    document.getElementById('resultPopup').classList.remove('hidden');
    document.getElementById('popupTitle').innerText = 'Server Hack Processing';

    // Start the countdown
    let countdownValue = 5;
    const countdownElement = document.getElementById('countdown');
    countdownElement.classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('result-buttons').classList.add('hidden');
    countdownElement.innerText = countdownValue;

    const countdownInterval = setInterval(() => {
        countdownValue--;
        countdownElement.innerText = countdownValue;

        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            const newResult = showResult();
            previousResult = newResult;  // Store the new result
        }
    }, 1000);
});

function showResult(result = null, isNew = true) {
    const resultElement = document.getElementById('result');
    const countdownElement = document.getElementById('countdown');
    const resultButtons = document.getElementById('result-buttons');

    // Generate a new result if needed
    if (!result) {
        const results = ['BIG', 'RED', 'SMALL', 'GREEN'];
        result = results[Math.floor(Math.random() * results.length)];
    }

    countdownElement.classList.add('hidden');
    resultElement.classList.remove('hidden');
    resultElement.innerText = result;
    document.getElementById('popupTitle').innerText = 'Server Hack Done';
    resultButtons.classList.remove('hidden');

    return result;  // Return the result for future reference
}

function showError(resultType) {
    if (resultType === 'Loss') {
        alert("Server Mismatch For Better Results Create New Account Using Server Link.");
    } else if (resultType === 'Win') {
        alert("Congratulations!");
    }
}

function closePopup() {
    document.getElementById('resultPopup').classList.add('hidden');
}