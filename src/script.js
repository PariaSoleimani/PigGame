'use strict';

const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const score1 = document.getElementById('score--1');
const score2 = document.getElementById('score--2');
const currentScore1 = document.querySelector('#current--1');
const currentScore2 = document.querySelector('#current--2');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnChoose = document.querySelector('.btn--choose');
const playerWinner1 = document.querySelector('#name--1');
const playerWinner2 = document.querySelector('#name--2');
const scoreInput = document.querySelector('.input-score');
const scoreBox = document.querySelectorAll('.box-score');
let EnteredWinningScore = scoreInput.value;
document.addEventListener('DOMContentLoaded', () => {
  scoreInput.addEventListener('input', () => {
    EnteredWinningScore = scoreInput.value;
  });
});

// CHOOSING PLAYER
let activePlayer;
btnChoose.addEventListener('click', () => {
  const randomPlayer = Math.trunc(Math.random() * 2) + 1;
  console.log(randomPlayer);
  player1.classList.remove('player--active');
  player2.classList.remove('player--active');
  randomPlayer === 1
    ? player1.classList.add('player--active')
    : player2.classList.add('player--active');
  btnHold.classList.remove('invisible');
  btnRoll.classList.remove('invisible');
  player1.classList.contains('player--active') ? (activePlayer = 1) : (activePlayer = 2);
});

// SWITCHIG PLAYER
const switchPlayer = () => {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  player1.classList.contains('player--active') ? (activePlayer = 1) : (activePlayer = 2);
};

// ROLLING THE DICE
const dicesArray = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];
let currentScore = [0, 0];
let diceValue = 0;

btnRoll.addEventListener('click', () => {
  let randomIndex = Math.trunc(Math.random() * dicesArray.length);
  console.log(randomIndex);
  dice.src = `./assets/${dicesArray[randomIndex]}`;
  dice.classList.remove('hidden');
  diceValue = randomIndex + 1;
  if (diceValue !== 1) {
    if (activePlayer === 1) {
      currentScore[0] += diceValue;
      currentScore1.textContent = currentScore[0];
    } else if (activePlayer === 2) {
      currentScore[1] += diceValue;
      currentScore2.textContent = currentScore[1];
    }
  } else {
    if (activePlayer === 1) {
      currentScore[0] = 0;
      currentScore1.textContent = currentScore[0];
    } else if (activePlayer === 2) {
      currentScore[1] = 0;
      currentScore2.textContent = currentScore[1];
    }
    switchPlayer();
  }
});

// HOLDING SCORE
let totalScore = [0, 0];
btnHold.addEventListener('click', () => {
  if (activePlayer === 1 && totalScore[0] < EnteredWinningScore) {
    totalScore[0] += currentScore[0];
    score1.textContent = totalScore[0];
    currentScore[0] = 0;
    currentScore1.textContent = currentScore[0];
  } else if (activePlayer === 2 && totalScore[1] < EnteredWinningScore) {
    totalScore[1] += currentScore[1];
    score2.textContent = totalScore[1];
    currentScore[1] = 0;
    currentScore2.textContent = currentScore[1];
  }
  if (totalScore[0] >= EnteredWinningScore || totalScore[1] >= EnteredWinningScore) {
    if (activePlayer === 1) {
      playerWinner1.textContent = 'Player 1 Wins!';
      dice.classList.add('hidden');
      btnHold.classList.add('invisible');
      btnRoll.classList.add('invisible');
      player1.classList.remove('player--active');
      player2.classList.remove('player--active');
      scoreBox.forEach(e => {
        e.classList.add('hidden');
      });
    } else if (activePlayer === 2) {
      playerWinner2.textContent = 'Player 2 Wins!';
      dice.classList.add('hidden');
      btnHold.classList.add('invisible');
      btnRoll.classList.add('invisible');
      player1.classList.remove('player--active');
      player2.classList.remove('player--active');
      scoreBox.forEach(e => {
        e.classList.add('hidden');
      });
    }
  }
  switchPlayer();
});

// RESETTING THE GAME
btnNew.addEventListener('click', () => {
  dice.classList.add('hidden');
  player1.classList.remove('player--active');
  player2.classList.remove('player--active');
  currentScore = [0, 0];
  totalScore = [0, 0];
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  dice.classList.add('hidden');
  btnHold.classList.add('invisible');
  btnRoll.classList.add('invisible');
  playerWinner1.textContent = 'Player 1';
  playerWinner2.textContent = 'Player 2';
});
