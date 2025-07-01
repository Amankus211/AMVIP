    function predict() {
            const periodNo = document.getElementById('periodNo').value;

            if (!periodNo) {
                alert('Please enter a valid period number');
                return;
            }

            const lastDigit = periodNo % 10;
            let result;

            if ([0, 2, 4].includes(lastDigit)) {
                result = "(0,2,4) SMALL, 🔴";
            } else if ([5, 7, 9].includes(lastDigit)) {
                result = "(5,7,9) BIG 🟢";
            } else if ([1, 3].includes(lastDigit)) {
                result = "(1,3) SMALL 🟢";
            } else if ([6, 8].includes(lastDigit)) {
                result = "(6,8) BIG 🔴";
            }

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = result;
            resultDiv.style.display = 'block';
        }



      
        function updatePeriodAndTimer() {
            const now = new Date();
            const seconds = now.getUTCSeconds();
            const remainingSeconds = 60 - seconds;
            const minutes = now.getUTCMinutes();
            const totalMinutes = now.getUTCHours() * 60 + minutes;

            // Update period number
            const periodElement = document.getElementById("period1m");
            const periodNumber = `${now.getUTCFullYear()}${(now.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}${now.getUTCDate().toString().padStart(2, "0")}1000${(
                10001 + totalMinutes
            ).toString()}`;
            periodElement.textContent = periodNumber;

            // Update timer
            const timerElement = document.getElementById("timer1m");
            timerElement.textContent = `00:${remainingSeconds
                .toString()
                .padStart(2, "0")}`;

            // Show result when period changes
            if (remainingSeconds === 60) {
                displayResult(periodNumber);
            }
        }

        function displayResult(periodNumber) {
            const resultDisplay = document.getElementById("resultDisplay");

            // Update current result
            const currentResult = resultsPattern[currentPeriodIndex];
            resultDisplay.textContent = currentResult;

            // Add class for styling
            resultDisplay.className = `result ${currentResult.toLowerCase()}`;

            currentPeriodIndex = (currentPeriodIndex + 1) % resultsPattern.length;
        }

        // Initialize the timer update
        setInterval(updatePeriodAndTimer, 1000);