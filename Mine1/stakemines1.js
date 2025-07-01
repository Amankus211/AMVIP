// Selecting grid container and start button
const gridContainer = document.querySelector('.grid-container');
const startBtn = document.getElementById('startBtn');

// Function to create grid items
function createGridItems() {
    for (let i = 0; i < 25; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
    }
}

// Function to get random grid items
function getRandomItems() {
    const randomIndexes = [];
    while (randomIndexes.length < 5) {
        const randomIndex = Math.floor(Math.random() * 25);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }
    return randomIndexes;
}

// Function to change selected grid items
function changeGridItems() {
    const randomIndexes = getRandomItems();
    randomIndexes.forEach(index => {
        gridContainer.children[index].classList.add('diamond');
    });
    
    // Reset grid items after 20 seconds
    setTimeout(() => {
        randomIndexes.forEach(index => {
            gridContainer.children[index].classList.remove('diamond');
        });
    }, 20000);
}

// Event listener for start button
startBtn.addEventListener('click', () => {
    changeGridItems();
});

// Generate grid items on page load
createGridItems();

function disable() {
    var x = document.getElementById("startBtn");
    var y = document.getElementById("wait");
    y.innerHTML="Wait for 20 sec For next round";
    x.style.display = "none";
    setTimeout(function() {
        x.style.display = "block";
        y.innerHTML="";
    }, 20000); // Delay for 20000 milliseconds (20 seconds)
  }
  function play() {
    var audio = document.getElementById("clickk");
    audio.play();
  }

  document.getElementById('closePopup').addEventListener('click', function() {
    // Removing popup
    document.getElementById('popupOverlay').style.display = 'none';
  });