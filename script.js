/*  Development Information 
Primary Developer Contact Information:
Sebastian Remar
Student at the department of Aerospace/Mechanical Engineer
Minor Computer Science
Statler College of Engineering & Mineral Resources
West Virginia University (WVU)rsr0016@mix.wvu.edu

Development History
Date                   Developer        Comments
-------------        -------------      --------------------------------
March 03, 2021    Sebastian Remar       Simple game of adding points by 
                                        Rolling a dice. Can be played by two
 */


'use strict'

// ======================== Setting Important Variables ==================//
//Players
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");


// Buttons
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const theDice = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");

// Variables to store current and total score + active player
let activePlayer;
let currentScore;
let totalScore;

// Variable Boolean to specify if we are playing or not
let isPlaying;


// ================= Initializing Game ===========================//
const iniGame = function () {
    // Variables to store current and total score + active player
    activePlayer = 0;
    currentScore = 0;
    totalScore = [0, 0];

    // Variable Boolean to specify if we are playing or not
    isPlaying = true;

        // Scores to zero
        document.getElementById("score--0").textContent = 0;
        document.getElementById("score--1").textContent = 0;
    
        document.querySelector(".player--" + activePlayer).classList.remove("player--winner");
        player1.classList.add("player--active");
        player2.classList.remove("player--active");
        theDice.classList.add("hidden");
}

iniGame();



// ======================= SWTICH PLAYER ===============================//
const switchPlayer = function () {

    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
}

newGame.addEventListener("click",iniGame);


// =============== ROLLING DICE ==============//
rollDice.addEventListener("click", function () {
    if (isPlaying) {
        // Getting Random number
        let randomNumber = Math.trunc(Math.random() * 6) + 1;
        // Displaying dice by removing hidden class and manipulating the src
        theDice.classList.remove("hidden");
        theDice.src = "dice-" + randomNumber + ".png";
        if (randomNumber == 1) {
            currentScore = 0;
            document.getElementById("current--" + activePlayer).textContent = 0;
            switchPlayer();
        } else {
            currentScore += randomNumber;
            document.getElementById("current--" + activePlayer).textContent = currentScore;
            // ====================== HOLDING DICE ================= //
            holdDice.addEventListener("click", function () {
                totalScore[activePlayer] += currentScore;
                currentScore = 0;
                document.getElementById("score--" + activePlayer).textContent = totalScore[activePlayer];
                document.getElementById("current--" + activePlayer).textContent = 0;
                if (totalScore[activePlayer] >= 20) {
                    isPlaying = false;
                    theDice.classList.add("hidden");
                    document.querySelector(".player--" + activePlayer).classList.add("player--winner");
                } else {
                    switchPlayer();
                }
            });
        }
    }
});






