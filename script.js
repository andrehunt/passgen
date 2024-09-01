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
    "example", "apple", "beach", "book", "chair", "cloud", "coffee", "dog",
    "door", "house", "light", "moon", "mountain", "paper", "plant", "rain",
    "road", "sky", "star", "table", "tree", "water", "window", "world", "air",
    "ball", "cat", "city", "day", "ear", "egg", "eye", "fire", "floor", "friend",
    "garden", "glass", "hand", "hill", "ice", "key", "leaf", "man", "mouse",
    "name", "night", "nose", "park", "pen", "phone", "river", "room", "sand",
    "school", "sea", "shoe", "snow", "sound", "street", "sun", "tail", "tea",
    "toy", "wind", "yard", "zoo", "action", "artist", "bottle", "bridge", "camera",
    "country", "dance", "desk", "doctor", "dream", "engine", "family", "flag",
    "food", "game", "gift", "ground", "hobby", "idea", "internet", "joke", "king",
    "lunch", "magic", "movie", "music", "net", "party", "place", "plan",
    "question", "record", "shirt", "simple", "sport", "story", "ticket", "train",
    "user", "view", "week", "wish", "zone", "running", "walking", "talking",
    "writing", "reading", "jumping", "flying", "swimming", "playing", "driving",
    "bringing", "taking", "seeing", "hearing", "making", "finding", "giving",
    "calling", "turning", "working", "camel", "panda", "zebra", "penguin",
    "owl", "eagle", "hawk", "parrot", "pigeon", "goose"
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
    wordCountDisplay.textContent = `${wordCount.value} word${wordCount.value > 1 ? 's' : ''}`;
}

function updateLengthDisplay() {
    lengthDisplay.textContent = `${passwordLength.value} characters`;
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
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

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
    strengthBar.style.width = `${percentage}%`;
    
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
