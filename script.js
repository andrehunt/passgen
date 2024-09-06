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
        (includeSymbols.checked ? '!@#$%^&*()-_=+[]{}|;:,.<>?/' : '');
    const numChars = chars.length;

    return Math.pow(numChars, length);
}

function updatePossibilitiesDisplay() {
    let possibilities = 0;

    if (passwordType.value === 'temporary') {
        possibilities = calculateTemporaryPossibilities();
    } else if (passwordType.value === 'secure') {
        possibilities = calculateSecurePossibilities();
    }

    possibilitiesDisplay.textContent = `Estimated possibilities: ${possibilities.toLocaleString()}`;
}

function generatePassword() {
    let password = '';
    let animationSteps = 0;

    if (passwordType.value === 'temporary') {
        // Animation for temporary passwords
        const numWords = parseInt(wordCount.value, 10);
        for (let i = 0; i < numWords; i++) {
            password += words[Math.floor(Math.random() * words.length)] + ' ';
        }
        const numDigits = 3;
        const numSymbols = 1;
        for (let i = 0; i < numDigits; i++) {
            password += Math.floor(Math.random() * 10);
        }
        password += '!';

    } else if (passwordType.value === 'secure') {
        // Animation for secure passwords
        const length = parseInt(passwordLength.value, 10);
        const chars = 'abcdefghijklmnopqrstuvwxyz' +
            (includeUppercase.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
            (includeNumbers.checked ? '0123456789' : '') +
            (includeSymbols.checked ? '!@#$%^&*()-_=+[]{}|;:,.<>?/' : '');
        const numChars = chars.length;

        for (let i = 0; i < length; i++) {
            animationSteps++;
            password += chars.charAt(Math.floor(Math.random() * numChars));
        }
    }

    generatedPassword.textContent = password;

    // Simulate animation
    if (passwordType.value === 'secure') {
        const animationInterval = setInterval(() => {
            if (animationSteps <= 0) {
                clearInterval(animationInterval);
            } else {
                let tempPassword = '';
                for (let i = 0; i < length; i++) {
                    tempPassword += chars.charAt(Math.floor(Math.random() * numChars));
                }
                generatedPassword.textContent = tempPassword;
                animationSteps--;
            }
        }, 30);
    }

    updatePossibilitiesDisplay();
}

function copyToClipboard() {
    const text = generatedPassword.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Password copied to clipboard!');
    });
}

passwordType.addEventListener('change', function() {
    if (passwordType.value === 'temporary') {
        temporaryOptions.style.display = 'block';
        secureOptions.style.display = 'none';
    } else if (passwordType.value === 'secure') {
        temporaryOptions.style.display = 'none';
        secureOptions.style.display = 'block';
    }
    updatePossibilitiesDisplay();
});

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Initialize UI
passwordType.dispatchEvent(new Event('change'));
