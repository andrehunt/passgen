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

function generatePassword() {
    let password = '';
    if (passwordType.value === 'temporary') {
        // Generate a simple password
        const numWords = 2;
        const selectedWords = [];
        for (let i = 0; i < numWords; i++) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            selectedWords.push(randomWord.charAt(0).toUpperCase() + randomWord.slice(1));
        }
        const numbers = Math.floor(Math.random() * 900) + 100; // Three random numbers
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const symbol = symbols.charAt(Math.floor(Math.random() * symbols.length));
        password = selectedWords.join('') + numbers + symbol;
    } else {
        // Generate a complex password
        const length = parseInt(passwordLength.value);
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
        
        let chars = lowercase;
        if (includeUppercase.checked) chars += uppercase;
        if (includeNumbers.checked) chars += numbers + '123456789';
        if (includeSymbols.checked) chars += symbols;
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    generatedPassword.value = password;
    updateStrengthMeter(password);
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const percentage = (strength / 4) * 100;
    strengthBar.style.width = `${percentage}%`;
    strengthBar.style.backgroundColor = 'red';
    strengthBar.textContent = '';
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    return Math.min(strength, 4);
}

function copyToClipboard() {
    generatedPassword.select();
    document.execCommand('copy');
}

passwordType.addEventListener('change', () => {
    if (passwordType.value === 'temporary') {
        temporaryOptions.classList.remove('hidden');
        secureOptions.classList.add('hidden');
    } else {
        temporaryOptions.classList.add('hidden');
        secureOptions.classList.remove('hidden');
    }
});

wordCount.addEventListener('input', () => {
    wordCountDisplay.textContent = `${wordCount.value} words`;
});

passwordLength.addEventListener('input', () => {
    lengthDisplay.textContent = `${passwordLength.value} characters`;
});

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Initialize particles.js
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 50,
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
            }
        },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});
