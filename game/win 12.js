// List of results to display
const results = [
            { text: "BIG 7 💚", class: "big" },
            { text: "SMALL 1 💚", class: "small" },
            { text: "BIG 9 💚", class: "big" },
            { text: "SMALL 2 ♥️", class: "small" },
            { text: "BIG 6 ♥️", class: "big" },
            { text: "SMALL", class: "small" },
            { text: "BIG", class: "big" },
            { text: "SMALL", class: "small" },
            { text: "SMALL", class: "small" },
            { text: "BIG", class: "big" },
            { text: "BIG ♥️ 6 8", class: "big" },
            { text: "SMALL 💚 2 3", class: "small" },
            { text: "BIG💚 7 9", class: "big" },
            { text: "SMALL 💚 1 3", class: "small" },
            { text: "SMALL ♥️ 0 2", class: "small" },
            { text: "SMALL ♥️ 2", class: "small" },
            { text: "BIG♥️ 5", class: "big" },
            { text: "BIG💚 3", class: "big" },
            { text: "SMALL 💚 1", class: "small" },
            { text: "SMALL 💚 6", class: "small" },
            { text: "BIG ♥️ 8", class: "big" },
            { text: "SMALL 💚 9 7", class: "small" },
            { text: "BIG ♥️ 2 5", class: "big" },
            { text: "SMALL 💚 34", class: "small" },
            { text: "BIG💚 5 6", class: "big" },
            { text: "SMALL 💚 4 4", class: "small" },
            { text: "SMALL ♥️ 4 6", class: "small" },
            { text: "SMALL ♥️ 2 0", class: "small" },
            { text: "BIG♥️ 3", class: "big" },
            { text: "BIG💚 6", class: "big" },
            { text: "SMALL 💚 5", class: "small" },
            { text: "SMALL 💚 4", class: "small" },
            { text: "BIG ♥️ 4", class: "big" },
            { text: "SMALL 💚 2", class: "small" }
        ];

        // Timer logic in JavaScript
        const timerElement = document.getElementById("timer1m");
        const resultElement = document.getElementById("currentResult");
        let previousPeriodNumber = -1; // To keep track of the last displayed period number
        let periodNumber = 0;

function updateTimer() {
            const now = new Date();
            const seconds = now.getSeconds();
            const remainingSeconds = 60 - seconds;
            const minutes = now.getMinutes();
            const totalMinutes = now.getHours() * 60 + minutes;

            // Increment period number every minute
            if (seconds === 0) {
                periodNumber++;
                const periodText = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}1000${10001 + totalMinutes}`;
                console.log("Current Period Number:", periodText);
                
                // Show one result when the period number changes
                const randomIndex = Math.floor(Math.random() * results.length);
                const selectedResult = results[randomIndex];

                // Update the result display
                resultElement.innerHTML = `<span class="${selectedResult.class}">${selectedResult.text}</span>`;
            }

            // Update timer in format "x x : x x" for 1-minute interval
            const formattedTime = `${String(0).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;
            timerElement.innerText = formattedTime;
        }
        setInterval(updateTimer, 1000); // Update every second
        window.onload = function() {
            const lastAccepted = localStorage.getItem('termsAccepted');
            const currentTime = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

            // Show the modal if not accepted or if more than 5 minutes have passed
            if (!lastAccepted || (currentTime - lastAccepted) > fiveMinutes) {
                document.getElementById('myModal').style.display = 'flex';
            }
          }
          

