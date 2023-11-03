// I remove every logic except for rollDice function to make it more easy to read
$(document).ready(function () {
    const diceImages = [
        "./dice/dice-six-faces-one.png",
        "./dice/dice-six-faces-two.png",
        "./dice/dice-six-faces-three.png",
        "./dice/dice-six-faces-four.png",
        "./dice/dice-six-faces-five.png",
        "./dice/dice-six-faces-six.png"
    ];

    const diceElements = $('.dice'); // Use jQuery to select dice elements
    const rollButton = $('.center-button'); // Use jQuery to select the roll button

    let diceValues = Array(5).fill(1);
    let currentRound = 1;
    let currentTurn = 1;
    let selectedDice = Array(5).fill(false);
    let scoreCard = {};

    const rollDice = () => {
        if (currentRound <= 13 && currentTurn <= 3) {
            for (let i = 0; i < diceElements.length; i++) {
                if (!selectedDice[i]) {
                    // Animate the dice roll using jQuery
                    $(diceElements[i]).fadeOut(300, function () {
                        const randomValue = Math.floor(Math.random() * 6);
                        diceValues[i] = randomValue + 1;
                        diceElements.eq(i).attr('src', diceImages[randomValue]);
                        $(this).fadeIn(300); // Fade in the new dice face
                    });
                }
            }

            currentTurn++;

            if (currentTurn > 3) {
                currentRound++;
                currentTurn = 1;
            }
        }
    };

    rollButton.on('click', rollDice); // Use jQuery to add click event listener
});
