'use strict';

let secretNumber = 0;
let score;

const displayInfo = (selector, message) => {
  document.querySelector(selector).textContent = message;
};

const disableInput = () => {
  document.querySelector('input.guess').setAttribute('disabled', 'disabled');
  document.querySelector('.btn.check').setAttribute('disabled', 'disabled');
};

const enableInput = () => {
  document.querySelector('input.guess').removeAttribute('disabled');
  document.querySelector('.btn.check').removeAttribute('disabled');
};

const resetGame = () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayInfo('.message', 'Start guessing...');
  displayInfo('.number', '?');
  displayInfo('.score', score);
  document.querySelector('input.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  enableInput();
  // console.info('the number: ', secretNumber);
};

const winner = () => {
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  displayInfo('.number', secretNumber);
  displayInfo('.message', '🎉 Correct number!');
  disableInput();
}

const loser = () => {
  displayInfo('.score', 0);
  displayInfo('.message', '💥 You lost the game!');
}

resetGame();

document.querySelector('button.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  let done = false;
  if (!guess) {
    displayInfo('.message', '⛔️ No number');
  } else if (guess === secretNumber) {
    winner();
    done = true;
  }
  else if (guess !== secretNumber) {
    displayInfo('.message', guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
  }

  if (score > 0) {
    displayInfo('.score', score);
  } else if(!done) {
    loser();
  }
});

document.querySelector('.btn.again').addEventListener('click', function () {
  resetGame();
});