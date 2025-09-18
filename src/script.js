// AREAS
const SELECETAREA = document.getElementById('SELECT');
const GAMEAREA = document.getElementById('GAME');

// RPS
const rock = document.getElementById('Rock');
const paper = document.getElementById('Paper');
const scissors = document.getElementById('Scissors');
const playerButtons = document.getElementsByClassName('playerButtons');
const selectedText = document.getElementById("selectedText")

// Gameplay Buttons
const throwButton = document.getElementById('throw');

// gameplay Screen
const playerSelection = document.getElementById('playerSelection');
const randomSelection = document.getElementById('randomSelection');
const winnerText = document.getElementById('winnerText');
const returnButton = document.getElementById('return');

// global vars
let currentChoice = ''
const choices = [
    "Rock",
    "Paper",
    "Scissors"
]

// functions
function getRandomChoice(){
    const currentBotChoice = choices[Math.floor(Math.random() * (choices.length))]
    return currentBotChoice
}

function getWinner(player, bot){
    if(player == bot){
        return "Draw!";
    }
    else{
        // Losses
        const lossText = `${bot} beats ${player}. Bot wins!`;
        
        if(bot == choices[1] && player == choices[0]){return lossText}
        else if(bot == choices[2] && player == choices[1]){return lossText}
        else if(bot == choices[0] && player == choices[2]){return lossText}

        // Wins
        const winText = `${player} beats ${bot}. Player wins!`;
        
        if(player == choices[0] && bot == choices[2]){return winText}
        else if(player == choices[1] && bot == choices[0]){return winText}
        else if(player == choices[2] && bot == choices[1]){return winText}
    }

    return "Unreachable, I hope."

}

// actual code goes here
for(let i = 0; i < playerButtons.length; i++){
    playerButtons[i].addEventListener('click', () => {
        currentChoice = playerButtons[i].id;
        selectedText.innerHTML = `Currently Selected: ${currentChoice}`;

        console.log(currentChoice);
    })
};

throwButton.addEventListener('click', () => {
    if(currentChoice !== ''){
        SELECETAREA.style.display = "none"
        GAMEAREA.style.display = "block"

        const path = `./img/${currentChoice}.png`
        playerSelection.src = path;

        const botChoice = getRandomChoice();

        const botPath = `./img/${botChoice}.png`
        randomSelection.src = botPath;

        const winner = getWinner(currentChoice, botChoice)
        winnerText.innerText=winner;
    }
})

returnButton.addEventListener('click', () => {
    SELECETAREA.style.display = "block";
    GAMEAREA.style.display = "none";

    currentChoice = "";
    selectedText.innerHTML = "Currently Selected: None";
})