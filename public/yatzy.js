const diceImages = [
    "/images/dice-six-faces-one.png",
    "/images/dice-six-faces-two.png",
    "/images/dice-six-faces-three.png",
    "/images/dice-six-faces-four.png",
    "/images/dice-six-faces-five.png",
    "/images/dice-six-faces-six.png"
];

const lockedScores = {
    "Number 1": false,
    "Number 2": false,
    "Number 3": false,
    "Number 4": false,
    "Number 5": false,
    "Number 6": false,
    "Three of a kind": false,
    "Four of a kind": false,
    "Full House": false,
    "Small straight": false,
    "Large straight": false,
    "Yatzee": false,
    "Chance": false,
   "Total Score": true,
};


const diceElements = Array.from(document.querySelectorAll('.dice'));
const rollButton = document.querySelector('.center-button');
const scoreboard = document.querySelector('table'); 
const scoreButton = document.querySelector('.score')
const rerollButton = document.querySelector('.re-roll-button');

let diceValues = [1, 1, 1, 1, 1]; 
let currentRound = 1;


function rollDice() {
    if (currentRound <= 13) {
        
        fetch('/roll-dice')
            .then((response) => response.json())
            .then((data) => {
                diceValues = data.diceValues;
                
                
                for (let i = 0; i < diceElements.length; i++) {
                    const randomValue = diceValues[i] - 1; 
                    diceElements[i].src = diceImages[randomValue];
                }
                
                const scoreCard = calculateScore(diceValues);
                updateScoreboard(scoreCard);
                currentRound++;

                
                if (currentRound === 13) {
                    displayTotalScore();
                }
            })
            .catch((error) => {
                console.error('Error fetching dice values:', error);
            });
    }
}


function calculateScore(diceValues) {
    const scoreCard = {};

    
    for (let number = 1; number <= 6; number++) {
        const score = diceValues.filter(value => value === number).reduce((acc, val) => acc + val, 0);
        scoreCard[`Number ${number}`] = score;
    }

    const threeOfAKind = calculateThreeOfAKind(diceValues);
    scoreCard["Three of a kind"] = threeOfAKind;

    const fourOfAKind = calculateFourOfAKind(diceValues);
    scoreCard["Four of a kind"] = fourOfAKind;

    const fullHouse = calculateFullHouse(diceValues);
    scoreCard["Full House"] = fullHouse;

    const smallStraight = calculateSmallStraight(diceValues);
    scoreCard["Small straight"] = smallStraight;

    const largeStraight = calculateLargeStraight(diceValues);
    scoreCard["Large straight"] = largeStraight;

    const yatzee = calculateYatzee(diceValues);
    scoreCard["Yatzee"] = yatzee;

    const chance = calculateChance(diceValues);
    scoreCard["Chance"] = chance;


    return scoreCard;
}

function calculateThreeOfAKind(diceValues) {
    
    const sortedDiceValues = diceValues.slice().sort((a, b) => a - b);

    for (let i = 0; i <= 3; i++) {
        if (sortedDiceValues[i] === sortedDiceValues[i + 2]) {
           
            return sortedDiceValues.reduce((acc, val) => acc + val, 0);
        }
    }

    
    return 0;
}

function calculateFourOfAKind(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a,b) => a -b);

for (let i=0; i <=2; i++) {
    if (sortedDiceValues[i] === sortedDiceValues[i + 3]) {
        return sortedDiceValues.reduce((acc, val) => acc+val, 0);
    }
}
    return 0;
}

function calculateFullHouse(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a, b) => a - b);

    for (let i = 0; i <= 2; i++) {
        if (
            sortedDiceValues[i] === sortedDiceValues[i + 2] &&
            sortedDiceValues[i + 3] === sortedDiceValues[i + 4]
        ) {
           
            return 25;
        }
    }

    return 0;
}

function calculateSmallStraight(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a, b) => a - b);

    for (let i = 0; i < sortedDiceValues.length - 3; i++) {
        
        if (
            sortedDiceValues[i] === sortedDiceValues[i + 1] - 1 &&
            sortedDiceValues[i + 1] === sortedDiceValues[i + 2] - 1 &&
            sortedDiceValues[i + 2] === sortedDiceValues[i + 3] - 1
        ) {
            return 30;
    }

   
}  return 0; }

function calculateLargeStraight(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a, b) => a -b);

    for (let i = 0; i < sortedDiceValues.length -3; i++) {
        if (
            sortedDiceValues[i] === sortedDiceValues[i +1] - 1 &&
            sortedDiceValues[i + 1] === sortedDiceValues[i+2] - 1 &&
            sortedDiceValues[i + 2] === sortedDiceValues[i + 3] - 1 &&
            sortedDiceValues[i +3] === sortedDiceValues[i + 4] - 1 
        ) {
            return 40;
        }
        
    }
    return 0; }

function calculateYatzee(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a, b) => a-b);

    for (let i =0; i <sortedDiceValues.length - 1; i++){
        if (sortedDiceValues[i] !== sortedDiceValues[i + 1]) {
            return 0;
        }
    }
    return 50;
}


function calculateChance(diceValues) {
    const sortedDiceValues = diceValues.slice().sort((a, b) => a - b);
    let sum = 0;

    for (let i = 0; i < sortedDiceValues.length; i++) {
        sum += sortedDiceValues[i];
    }

    return sum;
}

function calculateTotalScore() {
    
    const totalScore = Object.values(lockedScores)
        .filter((locked) => locked === true)
        .map((category) => scoreCard[category])
        .reduce((total, score) => total + score, 0);

    const totalScoreElement = document.querySelector('td.score[data-category="Total"]');
    totalScoreElement.textContent = totalScore;
}

function displayTotalScore() {
    const totalScoreElement = document.querySelector('td.score[data-category="Total Score"]');
    totalScoreElement.textContent = calculateTotalScore();
}

function updateScoreboard(scoreCard) {
    for (const category in scoreCard) {
        if (!lockedScores[category]) {
            const score = scoreCard[category];
            const scoreElement = document.querySelector(`td.score[data-category="${category}"]`);
            scoreElement.textContent = score; 
        }
    }
    
    const totalScore = Object.values(scoreCard).reduce((total, score) => total + score, 0);
    const totalScoreElement = document.querySelector('td.score[data-category="Total Score"]');
    totalScoreElement.textContent = totalScore;
}

function resetGame() {
    
    diceValues = [1, 1, 1, 1, 1];
    currentRound = 1;

  
    diceElements.forEach((element) => (element.src = '/images/dice-six-faces-one.png'));

    
    for (const category in lockedScores) {
        lockedScores[category] = false;
        const scoreElement = document.querySelector(`td.score[data-category="${category}"]`);
        scoreElement.textContent = '';
    }

    
    const totalScoreElement = document.querySelector('td.score[data-category="Total Score"]');
    totalScoreElement.textContent = '';
}

scoreboard.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD' && target.classList.contains('score')) {
        const category = target.getAttribute('data-category');
        lockedScores[category] = true;

        
        const allCategoriesLocked = Object.values(lockedScores).every((locked) => locked);
        if (allCategoriesLocked) {
            calculateTotalScore();
        }
    }
});

rerollButton.addEventListener('click', resetGame);
rollButton.addEventListener('click', rollDice);
