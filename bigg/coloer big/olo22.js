const popupOverlay = document.getElementById("popupOverlay");
  const registerButton = document.getElementById("registerButton");
  const cancelButton = document.getElementById("cancelButton");

  // Function to hide the popup after 1 minute
  function hidePopup() {
    setTimeout(function() {
      popupOverlay.style.display = "none";
    }, 60000); // 1 minute in milliseconds
  }
  function login() {
      const password = document.getElementById('password').value;
      
      if (password === '') {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainPage').classList.remove('hidden');
      } else {
        alert('Access Denied: Invalid credentials');
      }
    }

  // Function to start the timer and show the cancel button
  function startTimer() {
    setTimeout(function() {
      cancelButton.style.display = "block";
    }, 60000); // 1 minute in milliseconds
  }

  // Function to handle cancel button click
  function handleCancel() {
    popupOverlay.style.display = "none";
  }

  // Automatically display the popup when the page loads
  window.onload = function() {
    if (!localStorage.getItem("registered")) {
      popupOverlay.style.display = "flex";
      registerButton.addEventListener("click", function() {
        localStorage.setItem("registered", "true");
        startTimer(); // Start the timer when "Register" is clicked
        hidePopup(); // Automatically hide popup after 1 minute
      });
      cancelButton.addEventListener("click", handleCancel);
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    const predictedNumberElement = document.getElementById('predictedNumber');
    const predictedPremiumElement = document.getElementById('predictedPremium');
    const timerElement = document.getElementById('timeRemaining');
    const issueNumberElement = document.getElementById('issueNumber');
    const loadingElement = document.getElementById('loading');

    let currentIssueNumber = null;
    let timerInterval = null;

    const fetchGameIssue = () => {
      const requestData = {
        typeId: 1,
        language: 0,
        random: "e7fe6c090da2495ab8290dac551ef1ed",
        signature: "1F390E2B2D8A55D693E57FD905AE73A7",
        timestamp: Math.floor(Date.now() / 1000)
      };

      return fetch('https://api.bdg88zf.com/api/webapi/GetGameIssue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .catch(error => console.error('Error fetching game issue:', error));
    };

    const categorizeNumber = (number) => {
      return number >= 5 ? 'Red 🔴' : 'Green 🟢';
    };

    const generateRandomPrediction = () => {
      const randomNumber = Math.floor(Math.random() * 10);
    
      return {
        number: randomNumber,
        category: categorizeNumber(randomNumber),
        premium: 'N/A'
      };
    };

     

    const updatePrediction = (newIssueNumber) => {
      if (currentIssueNumber !== newIssueNumber) {
        currentIssueNumber = newIssueNumber;
        issueNumberElement.textContent = `🎯Period🧮: ${currentIssueNumber}`;

        loadingElement.style.display = 'block'; // Show loading

        setTimeout(() => {
          const currentPrediction = generateRandomPrediction();
          predictedNumberElement.textContent = `Coloer : ${currentPrediction.number} ${currentPrediction.category}`;
          predictedPremiumElement.textContent = `Predicted Premium: ${currentPrediction.premium}`;

          // Store prediction in sessionStorage
          sessionStorage.setItem('lastPrediction', JSON.stringify(currentPrediction));

          loadingElement.style.display = 'none'; // Hide loading
        }, 2000);
      }
    };

    const updateTimer = () => {
      fetchGameIssue()
        .then(data => {
          if (!data.data) {
            console.error('No data received for game issue.');
            return;
          }

          const { endTime, issueNumber } = data.data;
          const endDate = new Date(endTime);
          const now = new Date();
          const remainingTimeMs = endDate - now;

          if (remainingTimeMs <= 0) {
            timerElement.textContent = "00:00";
            clearInterval(timerInterval);

            setTimeout(() => {
              fetchGameIssue().then(data => {
                if (!data.data) {
                  console.error('No data received for new game issue.');
                  return;
                }

                const newIssueNumber = data.data.issueNumber;
                updatePrediction(newIssueNumber);
                timerInterval = setInterval(updateTimer, 1000);
              });
            }, 3000);

          } else {
            const minutes = String(Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((remainingTimeMs % (1000 * 60)) / 1000)).padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;
          }

          if (currentIssueNumber !== issueNumber) {
            updatePrediction(issueNumber);
          }
        })
        .catch(error => console.error('Error fetching game issue:', error));
    };

    const initializePrediction = () => {
      fetchGameIssue().then(data => {
        if (!data.data) {
          console.error('No data received for initial game issue.');
          return;
        }

        const initialIssueNumber = data.data.issueNumber;
        const storedPrediction = sessionStorage.getItem('lastPrediction');
        const lastPrediction = storedPrediction ? JSON.parse(storedPrediction) : null;

        if (lastPrediction) {
          predictedNumberElement.textContent = `Bet On 🎱: ${lastPrediction.number} (${lastPrediction.category})`;
          predictedPremiumElement.textContent = `Predicted Premium 🎱: ${lastPrediction.premium}`;
        } else {
          updatePrediction(initialIssueNumber);
        }
      });
    };

    // Visibility change event to update prediction when the tab becomes active
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        fetchGameIssue().then(data => {
          if (!data.data) {
            console.error('No data received for new game issue.');
            return;
          }
          const newIssueNumber = data.data.issueNumber;
          updatePrediction(newIssueNumber);
        });
      }
    });

    timerInterval = setInterval(updateTimer, 1000);
    initializePrediction();
  });