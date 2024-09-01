// Initialize Particles.js
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        }
    },
    "retina_detect": true
});

const passwordType = document.getElementById('passwordType');
const temporaryOptions = document.getElementById('temporaryOptions');
const secureOptions = document.getElementById('secureOptions');
const wordCount = document.getElementById('wordCount');
const wordCountDisplay = document.getElementById('wordCountDisplay');
const passwordLength = document.getElementById('passwordLength');
const lengthDisplay = document.getElementById('lengthDisplay');
const includeUppercase = document.getElementById('includeUppercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');

const words = [
    "apple", "beach", "book", "cloud", "coffee", "dog", "door", "house",
    "light", "moon", "mountain", "paper", "plant", "rain", "road", "sky",
    "star", "table", "tree", "water", "window", "world", "air", "ball",
    "cat", "city", "day", "fire", "glass", "hill", "key", "leaf", "night",
    "park", "phone", "river", "sand", "sea", "snow", "street", "sun", "tea",
    "wind", "zoo", "action", "artist", "bottle", "bridge", "dream", "family", "gift", "magic", "movie", "music", "party",
    "place", "plan", "record", "shirt", "simple", "sport", "story", "train",
    "view", "zone", "running", "walking", "talking", "reading", "jumping",
    "flying", "hearing", "finding", "bird", "lion", "tiger", "wolf", "fox",
    "rabbit", "squirrel", "panda", "zebra", "penguin", "owl", "eagle", "hawk",
    "parrot", "pigeon", "goose"
];

passwordType.addEventListener('change', updateOptions);
wordCount.addEventListener('input', updateWordCountDisplay);
passwordLength.addEventListener('input', updateLengthDisplay);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

function updateOptions() {
    if (passwordType.value === 'temporary') {
        temporaryOptions.classList.remove('hidden');
        secureOptions.classList.add('hidden');
    } else {
        temporaryOptions.classList.add('hidden');
        secureOptions.classList.remove('hidden');
    }
}

function updateWordCountDisplay() {
    wordCountDisplay.textContent = ${wordCount.value} word${wordCount.value > 1 ? 's' : ''};
}

function updateLengthDisplay() {
    lengthDisplay.textContent = ${passwordLength.value} characters;
}

function generatePassword() {
    let password = '';
    if (passwordType.value === 'temporary') {
        password = generateTemporaryPassword();
    } else {
        password = generateSecurePassword();
    }
    generatedPassword.value = password;
    updateStrengthMeter(password);
}

function generateTemporaryPassword() {
    const selectedWords = [];
    for (let i = 0; i < wordCount.value; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        selectedWords.push(randomWord.charAt(0).toUpperCase() + randomWord.slice(1));
    }

    // Generate three random numbers
    const numbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    // Add a random symbol
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const symbol = symbols.charAt(Math.floor(Math.random() * symbols.length));

    return selectedWords.join('') + numbers + symbol;
}

function generateSecurePassword() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%&+;

    let chars = lowercase;
    if (includeUppercase.checked) chars += uppercase;
    if (includeNumbers.checked) chars += numbers;
    if (includeSymbols.checked) chars += symbols;

    let password = '';
    for (let i = 0; i < passwordLength.value; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function copyPassword() {
    generatedPassword.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const percentage = (strength / 4) * 100;
    strengthBar.style.width = ${percentage}%;
    
    if (strength < 2) {
        strengthBar.classList.remove('bg-yellow-500', 'bg-green-500');
        strengthBar.classList.add('bg-red-500');
    } else if (strength < 3) {
        strengthBar.classList.remove('bg-red-500', 'bg-green-500');
        strengthBar.classList.add('bg-yellow-500');
    } else {
        strengthBar.classList.remove('bg-red-500', 'bg-yellow-500');
        strengthBar.classList.add('bg-green-500');
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    return Math.min(strength, 4);
}

// Initialize displays
updateWordCountDisplay();
updateLengthDisplay();
