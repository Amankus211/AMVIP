// Function to show popup on every reload
window.onload = function() {
  document.getElementById('popupOverlay').style.display = 'flex';
};

// Adding click event listener to close button
document.getElementById('closePopup').addEventListener('click', function() {
  // Removing popup
  document.getElementById('popupOverlay').style.display = 'none';
});

function isEmpty(inputField) {
  return inputField.value.trim() === '';
}

document.getElementById('btn').addEventListener('click', function() {
  var inputField = document.getElementById('inp');
  if (!isEmpty(inputField)) {
      getbet(); // Call getbet function only if input field is not empty
  } else {
      var div1 = document.getElementById("show_data1");
      
      var div3 = document.getElementById("show_data3");
      div1.innerHTML = "Enter Period Number"; // Change the inner HTML to "enter period number"
      div2.innerHTML = ""; // Clear inner HTML
      div3.innerHTML = ""; // Clear inner HTML
  }
});

function getbet() {
  var div1 = document.getElementById("show_data1");
  var div2 = document.getElementById("show_data2");
  var div3 = document.getElementById("show_data3");
  div1.innerHTML = "Loading..."; // Change the inner HTML to "Loading..."
  div2.innerHTML = ""; // Clear inner HTML
  div3.innerHTML = ""; // Clear inner HTML
  disable();
  setTimeout(function() {
      var data1 = ["SMALL", "BIG","RED","GREEN"];
      var data3 = [""];
      var randomIndex = Math.floor(Math.random() * data1.length);
      div1.innerHTML = data1[randomIndex];
      
      randomIndex = Math.floor(Math.random() * data3.length);
      div3.innerHTML = data3[randomIndex];
      // Set random string after 2 seconds
  }, 2000); // Delay for 2000 milliseconds (2 seconds)
}

function disable() {
  var x = document.getElementById("btn");
  x.style.display = "none";
  setTimeout(function() {
      x.style.display = "block";
  }, 20000); // Delay for 20000 milliseconds (20 seconds)
}

window.addEventListener('load', function() {
  var audio = document.getElementById("myAudio");
  audio.play();
});

function play() {
  var audio = document.getElementById("clickk");
  audio.play();
}

function generatePhoneNumber() {
  const firstDigit = Math.floor(Math.random() * 3) + 7; // Randomly select 7, 8, or 9 for the first digit
  const prefix = `${firstDigit}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`; // Generate 4-digit prefix
  const middleNumbers = Math.floor(Math.random() * 90) + 10; // Randomly generate a 3-digit number between 100 and 999
  const endingNumbers = Math.floor(Math.random() * 9000) + 1000; // Randomly generate a 4-digit number between 1000 and 9999
  return `User ${prefix}xxxx${middleNumbers} Won ₹${endingNumbers}`;
}

// Function to display the popup with a random phone number
function showPopup() {
  const popup = document.getElementById('popup');
  popup.textContent = generatePhoneNumber();
  popup.style.display = 'block'; // Show the popup
}

// Show the popup initially
showPopup();

// Update the popup every 5 seconds
setInterval(showPopup, 2000);