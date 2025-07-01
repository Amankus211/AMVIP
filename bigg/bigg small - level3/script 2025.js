// JavaScript for Side Drawer
function toggleDrawer() {
    const drawer = document.getElementById('sideDrawer');
    drawer.classList.toggle('open');
}

// JavaScript for Game Logic
document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#dataTable tbody');
    const predictedNumberElement = document.getElementById('predictedNumber');
    const currentPeriodElement = document.getElementById('currentPeriod');

    let gameData = [];
    let trendHistory = [];
    let gameStats = {
        totalGames: 0,
        totalWins: 0,
        totalLosses: 0,
        winPercentage: 0,
        currentStreak: 0
    };
    let lastPeriod = null;

    const fetchData = async (url, body) => {
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const getGameData = async () => {
        let data = await fetchData('https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList', {
            pageSize: 10, pageNo: 1, typeId: 1, language: 0,
            random: "ded40537a2ce416e96c00e5218f6859a",
            signature: "69306982EEEB19FA940D72EC93C62552",
            timestamp: Math.floor(Date.now() / 1000)
        });

        if (data && data.data && data.data.list) {
            return data.data.list.map(item => ({ issue: item.issueNumber, number: Number(item.number) }));
        }
        return [];
    };

    const categorizeNumber = (number) => (number >= 0 && number <= 4) ? "Small" : "Big";

    // Original Prediction Algorithm (as per your request)
    const improvedPredictionAlgorithm = (data) => {
        if (data.length < 5) return "No Data";

        const recentData = data.slice(0, 5); // Analyze last 5 periods
        let bigCount = recentData.filter(item => item.number > 4).length;
        let smallCount = recentData.filter(item => item.number <= 4).length;

        // Improved logic: If 4 out of 5 are Big, predict Big, else Small
        if (bigCount >= 4) return "Big";
        else if (smallCount >= 4) return "Small";
        else return Math.random() > 0.5 ? "Big" : "Small"; // Random fallback
    };

    const updateGameStats = (prediction, actualResult) => {
        gameStats.totalGames++;
        if (prediction === actualResult) {
            gameStats.totalWins++;
            gameStats.currentStreak++;
        } else {
            gameStats.totalLosses++;
            gameStats.currentStreak = 0;
        }
        gameStats.winPercentage = ((gameStats.totalWins / gameStats.totalGames) * 100).toFixed(2);

        // Save trend history
        trendHistory.push({
            period: gameData[0].issue,
            prediction: prediction,
            actualResult: actualResult,
            result: prediction === actualResult ? "Win" : "Loss"
        });
    };

    const updateDataAndPrediction = async () => {
        gameData = await getGameData();
        if (gameData.length > 0) {
            let currentIssueNumber = gameData[0].issue;

            // Check if the period has changed
            if (lastPeriod !== currentIssueNumber) {
                lastPeriod = currentIssueNumber;

                // Update prediction
                let prediction = improvedPredictionAlgorithm(gameData);
                predictedNumberElement.textContent = `𓄂AM VIP⍣👉: ${prediction}`;

                let nextPeriod = (BigInt(currentIssueNumber) + 1n).toString();
                currentPeriodElement.textContent = `📅 Period : ${nextPeriod}`;

                // Update game stats
                let actualResult = categorizeNumber(gameData[0].number);
                updateGameStats(prediction, actualResult);
            }

            tableBody.innerHTML = '';
            gameData.forEach((item) => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${item.issue}</td>
                        <td>${categorizeNumber(item.number)}</td>
                    </tr>`;
            });
        }
    };

    const renderHistory = () => {
        let message = `
        <span onclick="closeCustomAlert()">&times;</span>
            <h3>📜 History</h3>
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Prediction</th>
                        <th>Result</th>
                        <th>Win/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    ${trendHistory.map((item, index) => `
                        
                        <tr>
                            <td>${item.period}</td>
                            <td>${item.prediction}</td>
                            <td>${item.actualResult}</td>
                            <td class="${item.result === "Win" ? 'win' : 'loss'}">
                                ${item.result}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        let alertBox = document.createElement("div");
        alertBox.id = "customAlert";
        alertBox.innerHTML = `
            <div class="custom-alert">
                ${message}
                
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    // Tutorial Function
    window.showTutorial = function () {
        let message = `

         <span onclick="closeCustomAlert()">&times;</span>
            <h3>📚 Tutorial: How to Use</h3>
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
            <p>
                🔹 <strong>How It Works:</strong> AM AI S2 uses advanced algorithms to analyze the trend of the last 5 periods and predict the next outcome (Big or Small).<br><br>
                🔹 <strong>Big vs Small:</strong>
                <ul>
                    <li><strong>Big:</strong> Numbers from 5 to 9.</li>
                    <li><strong>Small:</strong> Numbers from 0 to 4.</li>
                </ul>
                🔹 <strong>When to Play:</strong>
                <ul>
                    <li>Play when the trend is stable (e.g., 1-4 consecutive Big/Small).</li>
                    <li>Look for patterns like streaks (e.g., Big, Big, Big).</li>
                </ul>
                🔹 <strong>When Not to Play:</strong>
                <ul>
                    <li>Avoid playing when the trend is unpredictable (e.g., alternating Big/Small).</li>
                    <li>If the last 5 periods show no clear pattern, wait for a better opportunity.</li>
                </ul>
                🔹 <strong>Time:</strong>
                <ul>
                    <li>Play during peak hours for better results.</li>
                    <li>Early mornings or late nights may have fewer players, making trends harder to predict.</li>
                </ul>
                🔹 <strong>Tips for Success:</strong>
                <ul>
                    <li>Start with small bets to understand the trend.</li>
                    <li>Increase your bet size only when you're confident in the prediction.</li>
                    <li>Always set a budget and stick to it.</li>
                </ul>
                🔹 <strong>Note:</strong> Gambling involves risk. Always play responsibly and never bet more than you can afford to lose.
            </p>
        `;
        let alertBox = document.createElement("div");
        alertBox.id = "customAlert";
        alertBox.innerHTML = `
            <div class="custom-alert">
                ${message}
               
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    // Game Statistics Function
    window.showGameStats = function () {
        let message = `
        <span onclick="closeCustomAlert()">&times;</span>
            <h3>📊 Game Statistics</h3>
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
            <table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Games Played</td>
                        <td>${gameStats.totalGames}</td>
                    </tr>
                    <tr>
                        <td>Total Wins</td>
                        <td>${gameStats.totalWins}</td>
                    </tr>
                    <tr>
                        <td>Total Losses</td>
                        <td>${gameStats.totalLosses}</td>
                    </tr>
                    <tr>
                        <td>Win Percentage</td>
                        <td>${gameStats.winPercentage}%</td>
                    </tr>
                    <tr>
                        <td>Current Streak</td>
                        <td>${gameStats.currentStreak}</td>
                    </tr>
                </tbody>
            </table>
        `;
        let alertBox = document.createElement("div");
        alertBox.id = "customAlert";
        alertBox.innerHTML = `
            <div class="custom-alert">
                ${message}
               
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    // Logout Function
    window.logout = function () {
        localStorage.removeItem("flashAiS2Key");
        window.location.href = "/index.html"; // Redirect to login page
    };

    // Toast Message Function
    window.showToast = function (message) {
        let toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };

    // Custom Settings Function
    window.showCustomSettings = function () {
        let message = `
            <h3>⚙️ Settings</h3>
            <p>Custom settings will be added soon.</p>
        `;
        let alertBox = document.createElement("div");
        alertBox.id = "customAlert";
        alertBox.innerHTML = `
            <div class="custom-alert">
                ${message}
                <button onclick="closeCustomAlert()">Close</button>
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    window.showHistory = () => renderHistory();
    window.closeCustomAlert = () => document.getElementById("customAlert")?.remove();

    // Check for period change every 1 second
    setInterval(updateDataAndPrediction, 1000);
});