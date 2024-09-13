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

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 100, // Adjust based on your preference
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ff4500" // Fire-like color (orange-red)
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.8, // Adjust opacity for a glowing effect
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.3,
                "sync": false
            }
        },
        "size": {
            "value": 1, // Adjust size for visibility
            "random": true,
            "anim": {
                "enable": false,
                "speed": 20,
                "size_min": 1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false, // Disable lines between particles
        },
        "move": {
            "enable": true,
            "speed": 4, // Adjust speed for smooth movement
            "direction": "none",
            "random": true, // Random movement for a fire-like effect
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
                "enable": true, // Enable interaction on hover
                "mode": "repulse" // Repulse effect to move particles away from the cursor
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

// Toggle between simple and secure password options
passwordType.addEventListener('change', () => {
    if (passwordType.value === 'secure') {
        temporaryOptions.classList.add('hidden');
        secureOptions.classList.remove('hidden');
    } else {
        secureOptions.classList.add('hidden');
        temporaryOptions.classList.remove('hidden');
    }
});

// Update displayed word count
wordCount.addEventListener('input', () => {
    wordCountDisplay.textContent = `${wordCount.value} words`;
});

// Update displayed password length
passwordLength.addEventListener('input', () => {
    lengthDisplay.textContent = `${passwordLength.value} characters`;
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
// Function to randomly capitalize characters (with 20% chance)
function capitalizeWithChance(word) {
    return word
        .split('')
        .map(char => (Math.random() < 0.20 ? char.toUpperCase() : char))
        .join('');
}

// Generate password
async function generatePassword() {
    let password = "";
    
    if (passwordType.value === 'temporary') {
        const numWords = parseInt(wordCount.value, 10);
        // Capitalize words randomly and add a breaker between words
        const randomWords = Array.from({ length: numWords }, () => 
            capitalizeWithChance(words[Math.floor(Math.random() * words.length)])
        ).join("-");
        const randomNumbers = Math.floor(100 + Math.random() * 900); // 3 random digits
        const randomSymbol = "!@#$%^&*()".charAt(Math.floor(Math.random() * 10)); // Random symbol
        
        // Format password with a breaker between words and numbers/symbols
        password = `${randomWords}-${randomNumbers}${randomSymbol}`;
    } else {
        const length = parseInt(passwordLength.value, 10);
        const chars = 'abcdefghijklmnopqrstuvwxyz' +
            (includeUppercase.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
            (includeNumbers.checked ? '0123456789' : '') +
            (includeSymbols.checked ? '!@#$%^&*()_+[]{}|;:,.<>?`~' : '');
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    generatedPassword.value = password;
    updateStrengthBar(password);
}

// Update strength bar based on password strength
function updateStrengthBar(password) {
    let strength = 0;
    if (password.length >= 12) strength = 100;
    else if (password.length >= 8) strength = 75;
    else if (password.length >= 6) strength = 50;
    else strength = 25;
    strengthBar.style.width = `${strength}%`;
}

// Invert colors
invertBtn.addEventListener('click', () => {
    document.body.classList.toggle('inverted');
});

// Event listener for password generation
generateBtn.addEventListener('click', generatePassword);

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    generatedPassword.select();
    document.execCommand('copy');
});
