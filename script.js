const terminal = document.getElementById('terminal');
const userInput = document.getElementById('user-input');
const loadingScreen = document.querySelector('.loading-screen');
const mainContent = document.querySelectorAll('.navbar, .hero, .generator, .about');
const asciiArt = document.getElementById('asciiArt');

// ASCII art for "PassGen"
const asciiArtText = `
 .S_sSSs     .S_SSSs      sSSs    sSSs          sSSSSs    sSSs   .S_sSSs    
.SS~YS%%b   .SS~SSSSS    d%%SP   d%%SP         d%%%%SP   d%%SP  .SS~YS%%b   
S%S   \`S%b  S%S   SSSS  d%S'    d%S'          d%S'      d%S'    S%S   \`S%b  
S%S    S%S  S%S    S%S  S%|     S%|           S%S       S%S     S%S    S%S  
S%S    d*S  S%S SSSS%S  S&S     S&S           S&S       S&S     S%S    S&S  
S&S   .S*S  S&S  SSS%S  Y&Ss    Y&Ss          S&S       S&S_Ss  S&S    S&S  
S&S_sdSSS   S&S    S&S  \`S&&S   \`S&&S         S&S       S&S~SP  S&S    S&S  
S&S~YSSY    S&S    S&S    \`S*S    \`S*S        S&S sSSs  S&S     S&S    S&S  
S*S         S*S    S&S     l*S     l*S        S*b \`S%%  S*b     S*S    S*S  
S*S         S*S    S*S    .S*P    .S*P        S*S   S%  S*S.    S*S    S*S  
S*S         S*S    S*S  sSS*S   sSS*S          SS_sSSS   SSSbs  S*S    S*S  
S*S         SSS    S*S  YSS'    YSS'            Y~YSSY    YSSP  S*S    SSS  
SP                 SP                                           SP          
Y                  Y                                            Y           
`;

// Function to display ASCII art with glitch effect
function displayAsciiArt() {
    const lines = asciiArtText.trim().split('\n');
    let html = '';
    lines.forEach((line, index) => {
        html += `<span class="ascii-line" style="animation-delay: ${index * 0.1}s;">`;
        for (let char of line) {
            if (Math.random() < 0.1) { // 10% chance for each character to be red
                html += `<span class="red-char" style="animation: glitch 0.3s infinite;">${char}</span>`;
            } else {
                html += char;
            }
        }
        html += '</span>';
    });
    asciiArt.innerHTML = html;
}

// Simulated loading process
const loadingSteps = [
    'Initializing password generator...',
    'Loading encryption algorithms...',
    'Calibrating random number generator...',
    'Establishing secure connection...',
    'Warming up quantum fluctuator...',
    'Synchronizing with time servers...',
    'Patching security vulnerabilities...',
    'Optimizing for maximum entropy...',
    'Loading user interface...',
    'System ready. Press Enter to continue...'
];

let currentStep = 0;

function simulateLoading() {
    if (currentStep < loadingSteps.length) {
        const line = document.createElement('div');
        line.className = 'line';
        line.textContent = loadingSteps[currentStep];
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        currentStep++;
        setTimeout(simulateLoading, Math.random() * 500 + 500);
    } else {
        userInput.style.display = 'inline-block';
        userInput.focus();
    }
}

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadingScreen.style.display = 'none';
        mainContent.forEach(element => element.style.display = 'block');
        displayAsciiArt();
    }
});

// Start the loading simulation
simulateLoading();

// Password generator logic
const passwordType = document.getElementById('passwordType');
const temporaryOptions = document.getElementById('temporaryOptions');
const secureOptions = document.getElementById('secureOptions');
const wordCount = document.getElementById('wordCount');
const wordCountDisplay = document.getElementById('wordCountDisplay
