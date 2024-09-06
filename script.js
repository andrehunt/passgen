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

// Color inversion button
document.getElementById("invertBtn").addEventListener("click", function() {
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

// Password reuse prevention (store last 5 passwords)
let previousPasswords = [];

// Password generation with animation
function generatePasswordWithAnimation() {
    let attempts = 0;
    const maxAttempts = 32;
    const interval = setInterval(() => {
        generatePassword(); // Generate password
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(interval);  // Stop the animation
        }
    }, 30);  // Generates a new password every 30ms
}

// Password generation with reuse prevention
function generatePassword() {
    let password = '';
    if (passwordType.value === 'temporary') {
        // Temporary password generation logic
        const numWords = parseInt(wordCount.value);
        const selectedWords = [];

        for (let i = 0; i < numWords; i++) {
            let randomWord = words[Math.floor(Math.random() * words.length)];
            randomWord = randomWord.split('').map(char => (Math.random() > 0.95 ? char.toUpperCase() : char)).join('');
            selectedWords.push(randomWord);
        }

        const numbers = Math.floor(Math.random() * 900) + 100; // Three random numbers
        const symbols = '!@#$+';
        const symbol = symbols.charAt(Math.floor(Math.random() * symbols.length));
        const separators = ['-', '&', '$', '#', '=', '@'];
        const randomSeparator = separators[Math.floor(Math.random() * separators.length)];
        password = selectedWords.join(randomSeparator) + numbers + symbol;
    } else {
        // Complex password generation logic
        const length = parseInt(passwordLength.value);
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let chars = lowercase;
        if (includeUppercase.checked) chars += uppercase;
        if (includeNumbers.checked) chars += numbers + '123456789';
        if (includeSymbols.checked) chars += symbols;
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    // Prevent password reuse
    while (previousPasswords.includes(password)) {
        password = generatePassword(); // Regenerate password if it's a duplicate
    }

    previousPasswords.push(password);
    if (previousPasswords.length > 5) previousPasswords.shift(); // Limit stored passwords

    generatedPassword.value = password;
    updateStrengthMeter(password);
}

// Password strength meter update
function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const percentage = (strength / 4) * 100;
    strengthBar.style.width = `${percentage}%`;
    strengthBar.style.backgroundColor = 'red';
    strengthBar.textContent = ''; // No text in the bar
}

// Password strength calculation
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++; // Non-alphanumeric characters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++; // Mixed case
    if (password.length >= 16) strength++; // Longer password

    return Math.min(strength, 8); // Cap strength at 4
}

// Clipboard copy function
function copyToClipboard() {
    generatedPassword.select();
    document.execCommand('copy');
}

// Password encryption function
function encryptPassword(password) {
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();
    return encryptedPassword;
}

// Audit log for password usage
let auditLog = [];
function logPasswordUsage(password) {
    const timestamp = new Date().toLocaleString();
    auditLog.push({ password, timestamp });
    console.log("Audit Log:", auditLog);  // Can store or display the audit log
}


// Event listeners
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

generateBtn.addEventListener('click', generatePasswordWithRateLimit); // Rate limit applied
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
