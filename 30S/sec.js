document.addEventListener('DOMContentLoaded', () => {
    const userStates = {}; // Store user states
    const apiUrl = 'https://api.51gameapi.com/api/webapi/GetEmerdList'; // Your API URL

    document.getElementById('predictButton').addEventListener('click', async () => {
        const numberInput = document.getElementById('numberInput').value;
        const resultDiv = document.getElementById('result');
        const categoryDiv = document.getElementById('category');

        if (numberInput < 0 || numberInput > 9 || isNaN(numberInput)) {
            resultDiv.innerHTML = "<b>Please enter a valid number between 0 and 9.</b>";
            return;
        }

        const userId = 'user'; // Simulate a unique user ID
        if (!userStates[userId]) {
            userStates[userId] = { showHigher: false }; // Default mode is to show lower
        }

        try {
            const apiData = await fetchData();
            if (apiData.error) {
                resultDiv.innerHTML = `<b>Error fetching data:</b> ${apiData.error}`;
                return;
            }

            generatePrediction(apiData, resultDiv, categoryDiv, userId);
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = "<b>Failed to fetch predictions. Please try again later.</b>";
        }
    });

    async function fetchData() {
        const requestData = {
            typeId: 30,
            language: 0,
            random: "a7579bd99f094d289d61fe20bc4d8d2b",
            signature: "7482D42553D12B25E8A29A921FC29FEA",
            timestamp: Math.floor(Date.now() / 1000),
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN_HERE' // Replace with your actual API token
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });
        return response.json();
    }

    function generatePrediction(data, resultDiv, categoryDiv, userId) {
        const numberScores = Array(10).fill(0);
        const drawnHistory = [5, 8, 8, 9, 3]; // Example history

        drawnHistory.forEach((number, index) => {
            numberScores[number] += index < drawnHistory.length - 3 ? 1 : -1;
        });

        const frequencyData = data.data.find(item => item.typeName === "Frequency") || {};
        const missingData = data.data.find(item => item.typeName === "Missing") || {};

        for (let i = 0; i < 10; i++) {
            numberScores[i] += (missingData[`number_${i}`] || 0) * 2;
            numberScores[i] += (10 - (frequencyData[`number_${i}`] || 0));
        }

        const rankedPredictions = numberScores
            .map((score, i) => ({ number: i, score }))
            .filter(prediction => prediction.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(6, 7);

        const smallCount = rankedPredictions.filter(pred => pred.number <= 4).length;
        const bigCount = rankedPredictions.filter(pred => pred.number >= 5).length;

        // Determine the result based on the current mode
        const currentMode = userStates[userId].showHigher ? 'HIGHER' : 'LOWER';
        const initialResult = currentMode === 'HIGHER' 
            ? (bigCount >= smallCount ? 'SMALL' : 'BIG') 
            : (smallCount <= bigCount ? 'BIG' : 'SMALL');

        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes() + 1 +18626;
        const threeMinuteInterval = Math.floor(totalMinutes / 3); // Change to 3-minute intervals
        const formattedMinutes = String(threeMinuteInterval).padStart(4, '0');
        const currentDate = now.toISOString().slice(0, 10).replace(/-/g, '');
        const autoPeriod = `${currentDate}01${formattedMinutes * 3}`; // Multiply by 3 to get back to the minute range
        
        let output = `<b>🎯 Prediction:𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</b><br><b>Top Predicted Numbers:</b><br>`;
        rankedPredictions.forEach((pred, index) => {
            const sizeLabel = pred.number >= 5 ? 'Big' : 'Small';
            output += `${index + 1}. ${pred.number} (${sizeLabel})<br>`;
        });

        output += `<br><b>📊 Game Types :- Wingo 30 sec</b>`;
        output += `<br><b>📈 Rᴇsᴜʟᴛ ➢</b> ${initialResult}`;

        categoryDiv.innerHTML = `
            <button id="category" class="betButton">Change Pre ⚙️</button>
        `;

        // Event listener for changing prediction
        document.getElementById('category').addEventListener('click', () => {
            userStates[userId].showHigher = !userStates[userId].showHigher;

            // Show the modal with the message
            const modeMessage = userStates[userId].showHigher ? '🔄' : '🔄';
            showModal(`Your prediction system has been changed! ${modeMessage} System.`);
        });

        resultDiv.innerHTML = output;
    }

    // Function to show the modal
    function showModal(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.innerText = message;
        modal.style.display = "block";
    }

    // Close the modal when the user clicks on <span> (x)
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modal').style.display = "none";
    });

    // Close the modal when clicking outside of the modal
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});