// JavaScript for Side Drawer
function toggleDrawer() {
    drawer.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', function () {
    
    
    const renderHistory = () => {
        let message = `
         <span onclick="closeCustomAlert()">&times;</span>
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
        <p>
                <div class="button-container">
        
        <button onclick="window.location.href='Aviato 1/82 Lottery.html'">1MIN 1</button>
        <button onclick="window.location.href='flash 2025/82lottery hat.HTM'">Chat 1MIN </button>
        <button onclick="window.location.href='Aviato 1/bot.html'"> 1min Nu</button>
        <button onclick="window.location.href='number p/51 club.html'">Big Hack</button>

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

    // Tutorial Function
    window.showTutorial = function () {
        let message = `
         <span onclick="closeCustomAlert()">&times;</span>
            <h3>𓄂⍣⃝🦋AM VIP⍣⃟❤️‍🩹𝄟</h3>
            <p>
           
            <button onclick="window.location.href='Big and Small Pr/82 lottery p.html'"> Tashan Win </button>
            
                <div class="button-container">
        <button onclick="window.location.href='bigg/bigg small - level3/main app.html'"> 82 Lottery </button>
        <button onclick="window.location.href='Big and Small Pr/DmWin Tiranga.html'">DmWin</button>
        <button onclick="window.location.href='Big and Small Pr/Tiranga game.html'">Tiranga </button>
   <button onclick="window.location.href='Big and Small Pr/BDG.html'">Bdg Win </button>
        <button onclick="window.location.href='Big and Small Pr/okwin.html'">OkWin </button>
   <button onclick="window.location.href='Big and Small Pr/Diuwin 1.html'">Diuwin </button>
   


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
        <button onclick="window.location.href='game/Wing 1Min.html'">Win 1min</button>
        <button onclick="window.location.href='game/WIN12.html'">Win 1min</button>
        <button onclick="window.location.href='game/FLASH AI S3.html'">AI hack</button>
        <button onclick="window.location.href='game/gts1.html'">Fid Ai Hack</button>
        <button onclick="window.location.href='game/Big small.html'">Ban 1min</button>
        <button onclick="window.location.href='App 2/coming soon.html'">Big 2</button>
        
                  
        
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
                <button onclick="closeCustomAlert()">Close</button>
            </div>
        `;
        document.body.appendChild(alertBox);
    };

    window.showHistory = () => renderHistory();
    window.closeCustomAlert = () => document.getElementById("customAlert")?.remove();
    
});

