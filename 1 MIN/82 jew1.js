
let lastMinutePeriod = -1;
    let lastMinuteResult = -1;
    let periodFixed = false;
    let initialPeriod = 0;

    const results = [
        "0 (Small) Violet", "1 (Small) Green", "2 (Small) Red", "3 (Small) Green", "4 (Small) Red",
        "5 (Big) Violet", "6 (Big) Red", "7 (Big) Green", "8 (Big) Red", "9 (Big) Green"
    ];

    // Update online users every second
    function updateOnlineUsers() {
        document.getElementById("online-users").textContent = Math.floor(Math.random() * 10000) + 20000;
    }

    // Update winning user
    function updateWinningUser() {
        const part1 = Math.floor(Math.random() * 361) + 620;
        const part2 = Math.floor(Math.random() * 260) + 621;
        document.getElementById("user-info").textContent = `User ${part1}***${part2} Win ₹${Math.floor(Math.random() * 50000)}`;
    }

    // Fix the period
    function fixPeriod() {
        const periodInput = document.getElementById("period-input").value;

        if (periodInput && periodInput !== "") {
            initialPeriod = parseInt(periodInput);
            document.getElementById("period-display").textContent = initialPeriod;
            periodFixed = true;
            document.getElementById("details-section").style.display = 'block';
            document.getElementById("fix-btn").style.display = 'none';
            document.getElementById("period-input-group").style.display = 'none';
        }
    }

    // Update the period every minute
    function updatePeriod() {
        const now = new Date();
        const minute = now.getMinutes();

        if (minute !== lastMinutePeriod) {
            lastMinutePeriod = minute;

            if (periodFixed) {
                initialPeriod += 1; // Increment the fixed period by 1
                document.getElementById("period-display").textContent = initialPeriod;
            } else {
                document.getElementById("period-display").textContent = minute; // Show current minute if not fixed
            }
        }
    }

    // Update remaining time
    function updateRemainingTime() {
        const now = new Date();
        const seconds = now.getSeconds();
        document.getElementById("remaining-time-display").textContent = `${59 - seconds}s`;
    }

    // Update results every minute
    function updateResults() {
        const now = new Date();
        const minute = now.getMinutes();

        if (minute !== lastMinuteResult) {
            lastMinuteResult = minute;
            const randomResult = Math.floor(Math.random() * results.length);
            document.getElementById("result-display").textContent = results[randomResult];
        }
    }

    // Realtime updates
    setInterval(() => {
        updateOnlineUsers();
        updateWinningUser();
        updatePeriod();
        updateRemainingTime();
        updateResults();
    }, 1000);

 
