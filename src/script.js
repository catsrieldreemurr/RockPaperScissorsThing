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

// Stats
const gamesPlayed = document.getElementById("gamesPlayed");
const totalWins = document.getElementById("totalWins");
const totalLosses = document.getElementById("totalLosses");
const ratio = document.getElementById("ratio");
const totalDraws = document.getElementById("totalDraws")

const stats = [
    0, // games
    0, // wins
    0, // losses
    0, // draws
]

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
        stats[3] += 1;
        return "Draw!";
    }
    else{
        // Losses
        const lossText = `${bot} beats ${player}. Bot wins!`;
        
        if(bot == choices[1] && player == choices[0]){
            stats[2] += 1;
            return lossText}
        else if(bot == choices[2] && player == choices[1]){
            stats[2] += 1;
            return lossText}
        else if(bot == choices[0] && player == choices[2]){
            stats[2] += 1;
            return lossText}

        // Wins
        const winText = `${player} beats ${bot}. Player wins!`;
        
        if(player == choices[0] && bot == choices[2]){
            stats[1] += 1;
            return winText}
        else if(player == choices[1] && bot == choices[0]){
            stats[1] += 1;
            return winText}
        else if(player == choices[2] && bot == choices[1]){
            stats[1] += 1;
            return winText}
    }

    return "Unreachable, I hope."

}

function getWinLoss(){
    if(stats[2] === 0){
        if(stats[1] > 0){
            return stats[1];
        }
        else{
            return 0
        }
    }

    return stats[1] / stats[2]
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

        stats[0] += 1;
    }
})

returnButton.addEventListener('click', () => {
    SELECETAREA.style.display = "block";
    GAMEAREA.style.display = "none";

    currentChoice = "";
    selectedText.innerHTML = "Currently Selected: None";

    gamesPlayed.innerText = `Games played: ${stats[0]}`;
    totalWins.innerText = `Wins: ${stats[1]}`;
    totalLosses.innerText = `Losses: ${stats[2]}`;
    totalDraws.innerText = `Draws: ${stats[3]}`

    const wlr = getWinLoss();
    ratio.innerText = `Win/Loss Ratio: ${wlr.toFixed(2)}`

})