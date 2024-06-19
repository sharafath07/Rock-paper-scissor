
let computerMove = '';
let userMove = '';
let result = '';
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};


function move() {
    const randomNo = Math.random();

    if (randomNo < 1 / 3 && randomNo >= 0) {
        computerMove = 'rock';
    } else if (randomNo >= 2 / 3 && randomNo < 1) {
        computerMove = 'scissors';
    }else {
        computerMove = 'paper';
    }
}

let isAutoPlaying = false
let intervalId

function autoPlay(){
    if (!isAutoPlaying){
        intervalId = setInterval(function() {
            move()
            const playerMove = computerMove
            playGame(playerMove)
        }, 1000);
        isAutoPlaying = true
        document.querySelector('.auto-play').innerText = `Stop Auto Play`
    } else {
        clearInterval(intervalId)
        isAutoPlaying = false
        document.querySelector('.auto-play').innerText = `Auto Play`
    }

    
}

function playGame(playerMove) {
    move()

    userMove = playerMove;

    if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        }  

    } else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        }  

    } else {
        
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        }  

    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement()

}

function updateScoreElement() {
    document.querySelector('.js-result').innerText = `${result} `;

    document.querySelector('.js-moves').innerHTML = `you <img src="images/${userMove}-emoji.png" alt="${userMove}" class="move-icon"><img class="move-icon" src="images/${computerMove}-emoji.png" alt="${computerMove}">Computer`;

    document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function reset() {
    score.wins = 0 ;
    score.losses = 0 ;
    score.ties = 0 ;
    localStorage.removeItem('score');

    updateScoreElement()

    document.querySelector('.js-result').innerHTML = ''
    document.querySelector('.js-moves').innerHTML = ''
}

