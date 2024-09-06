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
const invertBtn = document.getElementById('invertBtn');
const possibilitiesDisplay = document.getElementById('possibilitiesDisplay');

// Initialize particles.js
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
            "random": true,
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
            "enable": false,
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
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        }
    },
    "retina_detect": true
});

// Color inversion button
invertBtn.addEventListener("click", function() {
    document.body.classList.toggle("inverted");
});

const words = [
    "apple", "beach", "book", "cloud", "coffee", "dog", "door", "house",
    "light", "moon", "mountain", "paper", "plant", "rain", "road", "sky",
    "star", "table", "tree", "water", "window", "world", "air", "ball",
    "cat", "city", "day", "fire", "glass", "hill", "key", "leaf", "night",
    "park", "phone", "river", "sand", "sea", "snow", "street", "sun", "tea",
    "wind", "zoo", "action", "artist", "bottle", "bridge", "dream", "family",
    "gift", "magic", "movie", "music", "party", "place", "plan", "record",
    "shirt", "simple", "sport", "story", "train", "view", "zone", "running",
    "walking", "talking", "reading", "jumping", "flying", "hearing", "finding",
    "bird", "lion", "tiger", "wolf", "fox", "rabbit", "squirrel", "panda",
    "zebra", "penguin", "owl", "eagle", "hawk", "parrot", "pigeon", "goose",
    "turtle", "shark", "elephant", "monkey", "frog", "whale", "fish", "crab",
    "deer", "bat", "cheetah", "chicken", "cow", "dolphin", "duck", "giraffe",
    "hippo", "kangaroo", "leopard", "lizard", "octopus", "rhino", "seal",
    "sheep", "snake", "swan", "tiger", "turkey", "alligator", "bear", "beetle",
    "buffalo", "camel", "chipmunk", "cobra", "crocodile", "dove", "eagle",
    "falcon", "flamingo", "gorilla", "hedgehog", "hyena", "iguana", "jaguar",
    "koala", "lemur", "lynx", "mole", "mongoose", "mouse", "newt", "orca",
    "panther", "peacock", "porcupine", "quail", "raccoon", "raven", "salamander",
    "seagull", "spider", "squid", "vulture", "walrus", "weasel", "woodpecker",
    "worm", "yak", "antelope", "barn", "brick", "cabin", "car", "cart", "castle",
    "church", "city", "clock", "cone", "fence", "garage", "garden", "golf", 
    "harbor", "hat", "hotel", "lawn", "lighthouse", "mosque", "park", "pier",
    "post", "roof", "shop", "statue", "temple", "tower", "van", "vine", "wagon",
    "yard", "yacht", "angel", "arrow", "battle", "bow", "coin", "cup", "doll",
    "egg", "fountain", "glove", "helmet", "key", "lamp", "mirror", "paint", "pen",
    "pencil", "pipe", "quilt", "ring", "scarf", "shoe", "sword", "telescope",
    "toothbrush", "torch", "wheel", "wrench", "axe", "bag", "balloon", "banana",
    "bean", "bell", "biscuit", "bread", "broom", "candle", "carrot", "cave",
    "chair", "cheese", "cloud", "compass", "crayon", "crown", "cupboard", "dice",
    "drum", "eraser", "flag", "flashlight", "flower", "fork", "garden", "glue",
    "grape", "hammer", "jacket", "kettle", "ladder", "lantern", "lemon", "map",
    "microscope", "needle", "notebook", "nut", "paint", "pepper", "pillow",
    "pizza", "pocket", "potato", "pumpkin", "rope", "shovel", "soap", "spoon",
    "straw", "stump", "thread", "tomato", "umbrella", "vase", "wallet", "water",
    "whistle", "apple", "bell", "brush", "bucket", "butter", "candy", "clock",
    "cone", "cupcake", "cushion", "envelope", "fork", "fridge", "funnel", "fuse",
    "handle", "hook", "insect", "jug", "leaf", "log", "net", "nugget", "oil",
    "onion", "oven", "pad", "peanut", "pin", "puzzle", "radio", "rope", "sock",
    "spray", "sponge", "tent", "thread", "towel", "tube", "twig", "vine",
    "wheelbarrow", "wig", "yogurt"
];



function calculateTemporaryPossibilities() {
    const numWords = parseInt(wordCount.value, 10);
    const numDigits = 900; // 3-digit numbers (000-999)
    const numSymbols = 1; // Assuming a single symbol

    // Number of combinations
    const numWordCombinations = Math.pow(words.length, numWords);
    const numTotalCombinations = numWordCombinations * numDigits * numSymbols;

    return numTotalCombinations;
}

function calculateSecurePossibilities() {
    const length = parseInt(passwordLength.value, 10);
    const chars = 'abcdefghijklmnopqrstuvwxyz' +
        (includeUppercase.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
        (includeNumbers.checked ? '0123456789' : '') +
        (includeSymbols.checked ? '!@#$%^&*()_+[]{}|;:,.<>?`~' : '');

    // Number of possible characters
    const numChars = chars.length;

    // Number of combinations
    return Math.pow(numChars, length);
}

function updatePossibilitiesDisplay() {
    let possibilities = 0;

    if (passwordType.value === 'temporary') {
        possibilities = calculateTemporaryPossibilities();
    } else if (passwordType.value === 'secure') {
        possibilities = calculateSecurePossibilities();
    }

    possibilitiesDisplay.textContent = `Number of possible passwords: ${possibilities.toLocaleString()}`;
}

async function generatePassword() {
    const animationDuration = 30; // ms
    const maxIterations = 50;

    const partGenerator = passwordType.value === 'temporary' ? generateTemporaryPart() : generateSecurePart();

    if (passwordType.value === 'secure') {
        await animatePassword(partGenerator, animationDuration, maxIterations);
    }

    const finalPassword = partGenerator();
    generatedPassword.value = finalPassword;
    updateStrengthMeter(finalPassword);
    updatePossibilitiesDisplay();
}

function generateTemporaryPart() {
    return () => {
        const wordCountValue = parseInt(wordCount.value, 10);
        let password = '';
        for (let i = 0; i < wordCountValue; i++) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            password += (i > 0 ? '-' : '') + randomWord;
        }
        password += Math.floor(Math.random() * 900) + 100; // Add 3 random digits
        password += '!'; // Add a symbol
        return password;
    };
}

function generateSecurePart() {
    return () => {
        const length = parseInt(passwordLength.value, 10);
        const chars = 'abcdefghijklmnopqrstuvwxyz' +
            (includeUppercase.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
            (includeNumbers.checked ? '0123456789' : '') +
            (includeSymbols.checked ? '!@#$%^&*()_+[]{}|;:,.<>?`~' : '');

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    };
}

async function animatePassword(partGenerator, duration, maxIterations) {
    const originalPassword = generatedPassword.value;

    for (let i = 0; i < maxIterations; i++) {
        setTimeout(() => {
            generatedPassword.value = partGenerator();
        }, i * duration);
    }

    return new Promise(resolve => {
        setTimeout(() => {
            generatedPassword.value = partGenerator();
            resolve();
        }, maxIterations * duration);
    });
}

function updateStrengthMeter(password) {
    // Simple strength calculation for demonstration
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;
    strengthBar.style.width = `${strength}%`;

    // Optional: change color based on strength
    if (strength <= 25) {
        strengthBar.classList.add('bg-red-600');
        strengthBar.classList.remove('bg-yellow-600', 'bg-green-600');
    } else if (strength <= 50) {
        strengthBar.classList.add('bg-yellow-600');
        strengthBar.classList.remove('bg-red-600', 'bg-green-600');
    } else {
        strengthBar.classList.add('bg-green-600');
        strengthBar.classList.remove('bg-red-600', 'bg-yellow-600');
    }
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(generatedPassword.value);
});

passwordType.addEventListener('change', function() {
    temporaryOptions.style.display = passwordType.value === 'temporary' ? 'block' : 'none';
    secureOptions.style.display = passwordType.value === 'secure' ? 'block' : 'none';
    updatePossibilitiesDisplay();
});

wordCount.addEventListener('input', function() {
    wordCountDisplay.textContent = `${wordCount.value} words`;
    updatePossibilitiesDisplay();
});

passwordLength.addEventListener('input', function() {
    lengthDisplay.textContent = `${passwordLength.value} characters`;
    updatePossibilitiesDisplay();
});

includeUppercase.addEventListener('change', updatePossibilitiesDisplay);
includeNumbers.addEventListener('change', updatePossibilitiesDisplay);
includeSymbols.addEventListener('change', updatePossibilitiesDisplay);

passwordType.dispatchEvent(new Event('change'));

