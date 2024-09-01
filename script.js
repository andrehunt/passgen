particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 50, // Fewer particles for a less cluttered effect
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff" // Soft white color for subtlety
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.3, // Lower opacity for a more subtle appearance
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1, // Slow movement
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2, // Smaller particles
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1, // Slow size animation
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false // No connecting lines
        },
        "move": {
            "enable": true,
            "speed": 1, // Slow movement
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
                "enable": false // No interaction effects
            },
            "onclick": {
                "enable": false // No interaction effects
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
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');
const strengthMeter = document.getElementById('strengthMeter');
const strengthBar = document.getElementById('strengthBar');

const themeToggleButton = document.getElementById('themeToggle');

themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
});

passwordType.addEventListener('change', function() {
    if (this.value === 'temporary') {
        temporaryOptions.classList.remove('hidden');
        secureOptions.classList.add('hidden');
    } else {
        temporaryOptions.classList.add('hidden');
        secureOptions.classList.remove('hidden');
    }
});

wordCount.addEventListener('input', function() {
    wordCountDisplay.textContent = `${this.value} words`;
});

passwordLength.addEventListener('input', function() {
    lengthDisplay.textContent = `${this.value} characters`;
});

generateBtn.addEventListener('click', function() {
    let password = '';
    if (passwordType.value === 'temporary') {
        password = generateTemporaryPassword(parseInt(wordCount.value));
    } else {
        password = generateSecurePassword(parseInt(passwordLength.value));
    }
    generatedPassword.value = password;
    updateStrengthMeter(password);
});

copyBtn.addEventListener('click', function() {
    generatedPassword.select();
    document.execCommand('copy');
});

function generateTemporaryPassword(wordCount) {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];
    let password = '';
    for (let i = 0; i < wordCount; i++) {
        password += words[Math.floor(Math.random() * words.length)];
        if (i < wordCount - 1) password += '-';
    }
    return password;
}

function generateSecurePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function updateStrengthMeter(password) {
    const strength = calculateStrength(password);
    strengthBar.style.width = `${strength}%`;
    if (strength < 30) {
        strengthBar.style.backgroundColor = 'red';
    } else if (strength < 70) {
        strengthBar.style.backgroundColor = 'orange';
    } else {
        strengthBar.style.backgroundColor = 'green';
    }
}

function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[@$!%*?&#]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 20;
    return strength;
}
