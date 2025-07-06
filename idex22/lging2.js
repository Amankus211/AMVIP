  
  
let body = document.querySelector('body');
let fingerprint = document.querySelector('.fingerprint');
let center = document.querySelector('.center');
let scan = document.querySelector('.scan');
let timer, timerSuccesss;


        
            
function onSuccess() {
    body.removeEventListener('mousedown', onTouchstart);
    body.removeEventListener('touchstart', onTouchstart);
    


    fingerprint.classList.remove('active');
    center.classList.add('success')
   

    clearTimeout(timerSuccesss);

    timerSuccesss = setTimeout(() => {
        body.addEventListener('mousedown', onTouchstart);
        body.addEventListener('touchstart', onTouchstart);
        center.classList.remove('success')
       

    },3000);
}

function onTouchstart () {
    fingerprint.classList.add('active');
    timer = setTimeout(onSuccess,2000)
    
}

function onTouchEnd() {
    fingerprint.classList.remove('active')
    clearTimeout(timer)
}

body.addEventListener('mousedown', onTouchstart)
body.addEventListener('touchstart', onTouchstart)
body.addEventListener('mouseup', onTouchEnd)
body.addEventListener('touchend', onTouchEnd)
  
  function backToLogin() {
      location.reload(); // Reloads the page to bring back the login screen
    }
   
        const validIds = ['Afdan231', 'VIP1122', 'AN4961', 'Aye689', '1634jd3', 'AA254a', '1912869', 'Aryan44', 'vip1122', 'Get125', 'Ag85rs1', 'Ayrve5f']; // Predefined IDs
        const form = document.getElementById('accessForm');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', function (event) {
            event.preventDefault(fingerprint);
            const userId = document.getElementById('userId').value;
            
           
            if (validIds.includes(userId)) {
           
                resultDiv.innerHTML = `<div class="success">Access Granted! Redirecting...</div>`;
                setTimeout(() => {
                    window.location.href = 'navig2.html'; // Redirect to main.html
                }, 2000); // 2-second delay before redirecting
            } else {
                resultDiv.innerHTML = `<div class="error">Access Denied!</div>`;
            }
        }); 