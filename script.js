
// ==============================
// 1. Fungsi Navigasi Antar Bagian
// ==============================

// Menyembunyikan semua bagian (section) halaman
function hideAllSections() {
    document.getElementById("intro-section").style.display = "none";
    document.getElementById("games-section").style.display = "none";
    document.getElementById("scrambify-section").style.display = "none";
    document.getElementById("scrambify-game-section").style.display = "none";
    document.getElementById("memorify-section").style.display = "none";  
}

// Menampilkan halaman utama (Home)
function showHome() {
    hideAllSections(); // Hides all other sections
    document.getElementById("intro-section").style.display = "flex";  
    document.getElementById("games-section").style.display = "flex"; 
}

// Menampilkan halaman pemilihan kesulitan untuk Scrambify
function showScrambify() {
    hideAllSections();
    document.getElementById("scrambify-section").style.display = "block";
}

// Memulai game Scrambify berdasarkan tingkat kesulitan
function startScrambify(level) {
    currentLevel = level; 
    hideAllSections();
    document.getElementById("scrambify-game-section").style.display = "block";
    loadScrambledWord(level);
}

// Memulai game Memory Game
function startMemoryGame() {
    hideAllSections();
    document.getElementById("memorify-section").style.display = "block";
    initMemoryGame();
}

// Fungsi untuk menggulir ke bagian game saat "Get Started" ditekan
function scrollToGames() {
    // Scroll smoothly to the games section without hiding any section
    document.getElementById("games-section").scrollIntoView({ behavior: "smooth" });
}

// ==========================
// 2. Logika Game Scrambify
// ==========================

// Kumpulan kata berdasarkan tingkat kesulitan
let scrambledWords = {
    easy: [
        { word: "apple", hint: "A common fruit" },
        { word: "pear", hint: "A green fruit" },
        { word: "dog", hint: "A common pet" },
        { word: "cat", hint: "A feline pet" },
        { word: "sun", hint: "Star at the center of our solar system" },
        { word: "cup", hint: "You drink from it" },
        { word: "pen", hint: "Used for writing" },
        { word: "book", hint: "You read it" },
        { word: "milk", hint: "White liquid from cows" },
        { word: "bird", hint: "Animal that flies" },
        { word: "fish", hint: "Lives in water" },
        { word: "tree", hint: "Has leaves and branches" },
        { word: "rain", hint: "Falls from the sky" },
        { word: "car", hint: "A vehicle with four wheels" },
        { word: "bus", hint: "A large vehicle for public transport" },
        { word: "egg", hint: "Laid by chickens" },
        { word: "bed", hint: "You sleep on it" },
        { word: "cow", hint: "Animal that produces milk" },
        { word: "hat", hint: "Worn on the head" },
        { word: "door", hint: "You open and close it to enter a room" },
        { word: "nose", hint: "Used to smell things" },
        { word: "flag", hint: "A symbol of a country" },
        { word: "lamp", hint: "Provides light" },
        { word: "shoe", hint: "You wear it on your foot" },
        { word: "frog", hint: "An amphibian that jumps" },
        { word: "ship", hint: "A large boat" },
        { word: "sock", hint: "Worn inside shoes" },
        { word: "moon", hint: "Earth’s satellite" },
        { word: "bell", hint: "Rings to make a sound" },
        { word: "snow", hint: "White frozen precipitation" },
        { word: "kite", hint: "Flies in the wind on a string" },
        { word: "soap", hint: "Used to clean your hands" },
        { word: "bear", hint: "A large animal that hibernates" },
        { word: "duck", hint: "A bird that quacks" },
        { word: "goat", hint: "An animal with horns" },
        { word: "drum", hint: "A musical instrument" },
        { word: "corn", hint: "A yellow vegetable" },
        { word: "bell", hint: "It rings" },
        { word: "box", hint: "You can store things in it" },
        { word: "cup", hint: "Used to drink liquids" },
        { word: "key", hint: "Used to unlock a door" },
        { word: "cake", hint: "A sweet dessert" },
        { word: "clock", hint: "Shows time" },
        { word: "desk", hint: "You work at it" },
        { word: "apple", hint: "A common fruit" },
        { word: "duck", hint: "A water bird" },
        { word: "spoon", hint: "Used for eating soup" },
        { word: "ball", hint: "Round object used in games" }
    ],

    medium: [
        { word: "planet", hint: "We live on one" },
        { word: "candle", hint: "Wax with a wick for light" },
        { word: "bridge", hint: "Crosses over water" },
        { word: "guitar", hint: "A stringed instrument" },
        { word: "pencil", hint: "Used for drawing or writing" },
        { word: "castle", hint: "A large fortified building" },
        { word: "camera", hint: "Used to take pictures" },
        { word: "laptop", hint: "A portable computer" },
        { word: "island", hint: "Land surrounded by water" },
        { word: "forest", hint: "A large area of trees" },
        { word: "wallet", hint: "Holds money and cards" },
        { word: "sweater", hint: "Worn for warmth" },
        { word: "rocket", hint: "Travels to space" },
        { word: "soccer", hint: "A sport played with a ball" },
        { word: "window", hint: "Let's light into a room" },
        { word: "bottle", hint: "Holds liquids" },
        { word: "puzzle", hint: "A game with many pieces" },
        { word: "helmet", hint: "Protects your head" },
        { word: "jacket", hint: "Worn to keep warm" },
        { word: "ladder", hint: "Used to climb to a higher place" },
        { word: "desert", hint: "A dry, sandy area" },
        { word: "camera", hint: "Captures images" },
        { word: "skate", hint: "Shoes with wheels or blades" },
        { word: "volcano", hint: "Erupts with lava" },
        { word: "bridge", hint: "Allows passage over obstacles" },
        { word: "whistle", hint: "A device that makes a high-pitched sound" },
        { word: "trumpet", hint: "A brass musical instrument" },
        { word: "eagle", hint: "A large bird of prey" },
        { word: "pirate", hint: "A sea thief" },
        { word: "compass", hint: "Used to find direction" },
        { word: "shovel", hint: "Used for digging" },
        { word: "pencil", hint: "An object for writing" },
        { word: "basket", hint: "Used to hold items" },
        { word: "saddle", hint: "Placed on a horse's back" },
        { word: "glacier", hint: "A large body of ice" },
        { word: "statue", hint: "A sculpted figure" },
        { word: "garage", hint: "A place to park cars" },
        { word: "ticket", hint: "A slip for admission" },
        { word: "trumpet", hint: "A brass instrument" },
        { word: "pyramid", hint: "A triangular ancient structure" },
        { word: "mirror", hint: "Reflects images" },
        { word: "trophy", hint: "An award for winning" },
        { word: "needle", hint: "Used for sewing" },
        { word: "rocket", hint: "Travels to outer space" },
        { word: "statue", hint: "A sculpture made from stone or metal" },
        { word: "helmet", hint: "Protects your head" },
        { word: "tunnel", hint: "A passage under the ground" },
        { word: "shovel", hint: "Used to dig" },
        { word: "anchor", hint: "Holds a ship in place" }
    ],

    hard: [
        { word: "philanthropy", hint: "Desire to promote welfare of others" },
        { word: "metamorphosis", hint: "Process of transformation" },
        { word: "perspective", hint: "A point of view" },
        { word: "ambidextrous", hint: "Able to use both hands equally well" },
        { word: "conundrum", hint: "A difficult problem" },
        { word: "circumference", hint: "Distance around a circle" },
        { word: "juxtaposition", hint: "Placement of two things closely together" },
        { word: "hypothesis", hint: "A proposed explanation" },
        { word: "phenomenon", hint: "A remarkable event" },
        { word: "idiosyncrasy", hint: "A peculiar behavior" },
        { word: "inconsequential", hint: "Not important" },
        { word: "anachronistic", hint: "Out of time order" },
        { word: "discombobulate", hint: "To confuse" },
        { word: "antidisestablishmentarianism", hint: "Opposition to the disestablishment of a state church" },
        { word: "ubiquitous", hint: "Present everywhere" },
        { word: "serendipity", hint: "Finding something good without looking for it" },
        { word: "quintessential", hint: "The most perfect example" },
        { word: "misnomer", hint: "An incorrect name" },
        { word: "ephemeral", hint: "Lasting a short time" },
        { word: "equivocal", hint: "Ambiguous" },
        { word: "grandiloquent", hint: "Pompous in speech" },
        { word: "obfuscate", hint: "To deliberately make unclear" },
        { word: "pulchritudinous", hint: "Beautiful" },
        { word: "sycophant", hint: "A flatterer" },
        { word: "belligerent", hint: "Hostile and aggressive" },
        { word: "gregarious", hint: "Sociable" },
        { word: "calligraphy", hint: "The art of beautiful writing" },
        { word: "exacerbate", hint: "To make worse" },
        { word: "magnanimous", hint: "Generous" },
        { word: "obsequious", hint: "Overly submissive" },
        { word: "quixotic", hint: "Idealistic but impractical" },
        { word: "mellifluous", hint: "Sweet-sounding" },
        { word: "quintessence", hint: "The purest form" },
        { word: "syllogism", hint: "A form of reasoning" },
        { word: "oxymoron", hint: "A contradiction in terms" },
        { word: "recalcitrant", hint: "Resisting authority" },
        { word: "obstreperous", hint: "Noisy and difficult to control" },
        { word: "grandiloquence", hint: "Pompous speech" },
        { word: "histrionic", hint: "Overly theatrical" },
        { word: "sesquipedalian", hint: "Given to the use of long words" },
        { word: "petrichor", hint: "The smell after rain" },
        { word: "nefarious", hint: "Wicked or criminal" },
        { word: "vituperative", hint: "Bitter and abusive" },
        { word: "perspicacious", hint: "Keen and insightful" },
        { word: "laconic", hint: "Using very few words" },
        { word: "logorrhea", hint: "Excessive wordiness" },
        { word: "xenophobia", hint: "Fear of foreigners" },
        { word: "verisimilitude", hint: "Appearance of being true" },
        { word: "anomaly", hint: "Something that deviates from the norm" }
    ]
};

// Variabel global untuk menyimpan kata dan tingkat kesulitan saat ini
let currentScrambledWord = {};
let currentLevel = "";

// Memuat kata acak berdasarkan tingkat kesulitan
function loadScrambledWord(level) {
    // Membersihkan feedback sebelumnya
    let feedback = document.getElementById("game-feedback");
    feedback.textContent = "";

    // Mendapatkan kata acak dari tingkat kesulitan tertentu
    let wordData = scrambledWords[level][Math.floor(Math.random() * scrambledWords[level].length)];
    
    // Mengacak kata dan menyimpan kata saat ini
    currentScrambledWord = wordData;
    let scrambled = shuffleWord(wordData.word.split(''));

    // Membersihkan kata acak sebelumnya
    let scrambledContainer = document.getElementById("scrambled-letters");
    scrambledContainer.innerHTML = '';

    // Membuat elemen huruf yang bisa diseret (draggable)
    scrambled.forEach((letter) => {
        let letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.setAttribute('draggable', true);
        letterElement.textContent = letter;

        letterElement.addEventListener('dragstart', dragStart);
        letterElement.addEventListener('dragover', dragOver);
        letterElement.addEventListener('drop', drop);
        letterElement.addEventListener('dragend', dragEnd);

        scrambledContainer.appendChild(letterElement);
    });
}

// Mengacak huruf dari kata
function shuffleWord(wordArray) {
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray;
}

// Handle drag dan drop
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    setTimeout(() => event.target.style.opacity = "0.5", 0);
}

function dragEnd() {
    draggedItem = null;
    document.querySelectorAll('.letter').forEach(el => el.style.opacity = "1");
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('letter')) {
        let container = target.parentNode;
        let targetLetterIndex = Array.from(container.children).indexOf(target);
        let draggedLetterIndex = Array.from(container.children).indexOf(draggedItem);

        // Swapping the letters for smooth drag and drop
        if (draggedLetterIndex !== targetLetterIndex) {
            if (draggedLetterIndex < targetLetterIndex) {
                container.insertBefore(draggedItem, target.nextSibling);
            } else {
                container.insertBefore(draggedItem, target);
            }
        }
    }
}

// Mengubah ke pertanyaan selanjutnya
function nextQuestion() {
    loadScrambledWord(currentLevel);  
    document.getElementById("game-feedback").textContent = '';  
}

// Mengecek jawaban pengguna
function checkAnswer() {
    let scrambledContainer = document.getElementById("scrambled-letters");
    let userWord = Array.from(scrambledContainer.children).map(letter => letter.textContent).join('');

    let feedback = document.getElementById("game-feedback");
    if (userWord === currentScrambledWord.word) {
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = 'green';
        setTimeout(() => loadScrambledWord(currentLevel), 1000);  
    } else {
        feedback.textContent = "Try again!";
        feedback.style.color = 'red';
    }
}

// Menampilkan hint
function giveHint() {
    let feedback = document.getElementById("game-feedback");
    feedback.textContent = `Hint: ${currentScrambledWord.hint}`;
    feedback.style.color = 'blue';
}

// ===============================
// 3. Logika Game Memory Game
// ===============================

// Variabel global
let memoryCards = []; // Menyimpan semua kartu dalam game
let flippedCards = []; // Menyimpan kartu yang sedang dibalik
let matchedCards = []; // Menyimpan kartu yang sudah dicocokkan
let canFlip = true;  // Mengontrol apakah kartu bisa dibalik atau tidak

// Inisialisasi Permainan
function initMemoryGame() {
    // Kumpulan kata-kata untuk permainan
    let words = [
        { word: 'rain', meaning: 'Water that falls from the sky' },
        { word: 'mountain', meaning: 'A large natural elevation of the earth\'s surface' },
        { word: 'cloud', meaning: 'A visible mass of condensed water vapor' },
        { word: 'desert', meaning: 'A dry barren area of land' },
        { word: 'river', meaning: 'A large natural stream of water' },
        { word: 'island', meaning: 'A piece of land surrounded by water' },
        { word: 'ocean', meaning: 'A vast body of saltwater that covers much of the earth' },
        { word: 'bridge', meaning: 'A structure that allows passage over an obstacle' },
        { word: 'whale', meaning: 'A large marine mammal' },
        { word: 'shark', meaning: 'A large fish with sharp teeth' },
        { word: 'tiger', meaning: 'A large wild cat with stripes' },
        { word: "chair", meaning: "Furniture you sit on" },
        { word: "table", meaning: "Furniture used for eating or working" },
        { word: "banana", meaning: "A long yellow fruit" },
        { word: "grape", meaning: "A small, round, purple or green fruit" },
        { word: "cherry", meaning: "A small, round, red fruit" },
        { word: "butterfly", meaning: "An insect with colorful wings" },
        { word: "turtle", meaning: "A slow-moving reptile with a shell" },
        { word: "elephant", meaning: "A large animal with big ears and a trunk" },
        { word: "giraffe", meaning: "A tall animal with a long neck" },
        { word: "zebra", meaning: "An animal with black and white stripes" },
        { word: "orange", meaning: "A round citrus fruit" },
        { word: "strawberry", meaning: "A red fruit with tiny seeds on the outside" },
        { word: "cookie", meaning: "A sweet baked treat" },
        { word: "piano", meaning: "A large musical instrument with keys" },
        { word: "guitar", meaning: "A musical instrument with strings" },
        { word: "drum", meaning: "A musical instrument you hit with sticks" },
        { word: "train", meaning: "A form of transport that runs on tracks" },
        { word: "bus", meaning: "A large vehicle that carries many passengers" },
        { word: "car", meaning: "A common vehicle with four wheels" },
        { word: "bike", meaning: "A two-wheeled vehicle you pedal" },
        { word: "sock", meaning: "Worn on your feet under shoes" },
        { word: "hat", meaning: "Worn on your head" },
        { word: "coat", meaning: "Worn in cold weather to keep warm" },
        { word: "glove", meaning: "Worn on the hands to keep them warm" },
        { word: "scarf", meaning: "Worn around the neck for warmth or style" },
        { word: "ring", meaning: "Jewelry worn on the finger" },
        { word: "watch", meaning: "Worn on the wrist to tell time" },
        { word: "river", meaning: "A large natural stream of water" },
        { word: "mountain", meaning: "A very tall natural place on Earth" },
        { word: "beach", meaning: "A sandy area by the ocean" },
        { word: "forest", meaning: "A large area covered with trees" },
        { word: "flower", meaning: "A colorful part of a plant" },
        { word: "tree", meaning: "A tall plant with a trunk and branches" },
        { word: "leaf", meaning: "A green part of a plant" },
        { word: "stone", meaning: "A small piece of rock" },
        { word: "sand", meaning: "Tiny grains of rock found on beaches" },
        { word: "sea", meaning: "A large body of saltwater" },
        { word: "lake", meaning: "A large body of freshwater surrounded by land" },
        { word: "moon", meaning: "A natural satellite of the Earth" },
        { word: "star", meaning: "A bright object in the night sky" },
        { word: "sky", meaning: "What you see when you look up during the day" },
        { word: "sun", meaning: "The star at the center of our solar system" },
        { word: "cloud", meaning: "A collection of water droplets in the sky" },
        { word: "rain", meaning: "Water falling from the sky" },
        { word: "snow", meaning: "Frozen precipitation in the form of flakes" },
        { word: "storm", meaning: "A violent weather condition with wind, rain, or snow" },
        { word: "wind", meaning: "Air in motion" },
        { word: "mist", meaning: "A light fog, often seen in the morning" },
        { word: "dew", meaning: "Tiny drops of water that form on cool surfaces at night" },
        { word: "ice", meaning: "Frozen water"}
    ];

    // Secara random memilih 6 kata yang akan dicocokkan
    let selectedWords = [];
    while (selectedWords.length < 6) {
        let randomIndex = Math.floor(Math.random() * words.length);
        let randomPair = words[randomIndex];
        if (!selectedWords.includes(randomPair)) {
            selectedWords.push(randomPair);
        }
    }

    memoryCards = [];
    selectedWords.forEach(pair => {
        memoryCards.push({ text: pair.word, type: 'word', pair: pair.meaning });
        memoryCards.push({ text: pair.meaning, type: 'meaning', pair: pair.word });
    });

    // Shuffle kartu
    memoryCards.sort(() => 0.5 - Math.random());

    let memoryGameContainer = document.getElementById('memory-game');
    memoryGameContainer.innerHTML = '';  

    memoryCards.forEach((card, index) => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.text = card.text;
        cardElement.dataset.index = index;
        cardElement.dataset.type = card.type;
        cardElement.dataset.pair = card.pair;
        cardElement.innerText = '';  
        cardElement.addEventListener('click', () => flipCard(cardElement));
        memoryGameContainer.appendChild(cardElement);
    });

    // Mereset seluruh game
    flippedCards = [];
    matchedCards = [];
    canFlip = true;
    document.getElementById('memory-feedback').textContent = '';  // Mereset feedback
}

// Membalik kartu
function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || matchedCards.includes(card.dataset.index)) return;

    // Membalikkan kartu dan menampilkan tulisannya
    card.innerText = card.dataset.text;
    card.classList.add('flipped');
    flippedCards.push(card);

    // Saat dua kartu dibalikkan akan dicek apakah cocok atau tidak
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Memeriksa apakah kedua kartu cocok
function checkForMatch() {
    canFlip = false;
    let [card1, card2] = flippedCards;

    if (card1.dataset.pair === card2.dataset.text && card2.dataset.pair === card1.dataset.text) {
        matchedCards.push(card1.dataset.index, card2.dataset.index);
        document.getElementById('memory-feedback').textContent = 'Match found!';
        document.getElementById('memory-feedback').style.visibility = 'visible';
        
        setTimeout(() => { // Menghilangkan feedback setelah 2 detik
            document.getElementById('memory-feedback').style.visibility = 'hidden';
        }, 2000);

        flippedCards = [];
        canFlip = true;

        if (matchedCards.length === memoryCards.length) { 
            setTimeout(() => { 
                document.getElementById('memory-feedback').textContent = 'You matched all the cards!';
                document.getElementById('memory-feedback').style.visibility = 'visible';
            }, 3100);
        }
    } else {
        setTimeout(() => {
            card1.innerText = '';
            card2.innerText = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Reset permainan
function resetMemoryGame() {
    initMemoryGame();
}

// =========================
// Menampilkan halaman utama saat pertama kali
// =========================
showHome();