// JavaScript for Side Drawer
function toggleDrawer() {
    drawer.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', function () {
    
    
    const renderHistory = () => {
        let message = `
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
        <p>
        
             </p>
        
        `;
        let alertBox = document.createElement("div");
        alertBox.id = "customAlert";
        alertBox.innerHTML = `
            <div class="custom-alert">
                ${message}
        
               <span onclick="closeCustomAlert()">&times;</span>
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    // Tutorial Function
    window.showTutorial = function () {
        let message = `
         <span onclick="closeCustomAlert()">&times;</span>
            <h1>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h1>
            <p>
            
<button onclick="window.location.href='flash 2025/82lottery hat.HTM'">Chat 1MIN </button>
       
<button onclick="window.location.href='lock/PW PASS.html'">1 MIN game </button>



            
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
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
            <p>
        <div class="button-container">
                <button onclick="window.location.href='Gift 🎁/Gift.html'">🧧Gift code🎁</button>
    
        <button onclick="window.location.href='Aviato 22/aviator14.html'">🚀 Aviator 🚀</button>
    </div>
        <button onclick="window.location.href='Mine1/Hack 13 .html'">🎛 MINE 💎</button>
        <button onclick="window.location.href='Mine1/tm.html'">🎛MINE 2 💎</button>
        <button onclick="window.location.href='30S/Hack 2024.html'">🧮 Hack</button>
        <button onclick="window.location.href='App 2/coming soon.html'">WIN Go 1min</button>
        
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

    // Logout Function
    window.logout = function () {
        localStorage.removeItem("flashAiS2Key");
        window.location.href = "/index.html"; // Redirect to login page
    
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
                 <span onclick="closeCustomAlert()">&times;</span>
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    window.showHistory = () => renderHistory();
    window.closeCustomAlert = () => document.getElementById("customAlert")?.remove();
    
});

